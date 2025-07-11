// Sticky Notes Content Script Module
// Handles creation, editing, deletion, repositioning, and persistence of notes per domain/URL.

interface StickyNote {
  id: string;
  text: string;
  x: number;
  y: number;
  url: string;
}

const STORAGE_KEY = 'webwhiz_sticky_notes';

function getCurrentUrlKey() {
  return window.location.origin + window.location.pathname;
}

function loadNotes(callback: (notes: StickyNote[]) => void) {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    const allNotes = result[STORAGE_KEY] || {};
    const urlKey = getCurrentUrlKey();
    callback(allNotes[urlKey] || []);
  });
}

function saveNotes(notes: StickyNote[]) {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    const allNotes = result[STORAGE_KEY] || {};
    const urlKey = getCurrentUrlKey();
    allNotes[urlKey] = notes;
    chrome.storage.local.set({ [STORAGE_KEY]: allNotes });
  });
}

function createNoteElement(note: StickyNote, onUpdate: (note: StickyNote) => void, onDelete: (id: string) => void) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'webwhiz-sticky-note fixed z-[99999] bg-yellow-100 dark:bg-yellow-800 text-gray-900 dark:text-gray-100 shadow-lg rounded p-2 min-w-[120px] min-h-[60px] cursor-move';
  noteDiv.style.left = note.x + 'px';
  noteDiv.style.top = note.y + 'px';
  noteDiv.style.maxWidth = '200px';
  noteDiv.style.position = 'fixed';
  noteDiv.setAttribute('data-id', note.id);

  // Edit area
  const textarea = document.createElement('textarea');
  textarea.value = note.text;
  textarea.className = 'w-full bg-transparent outline-none resize-none text-sm';
  textarea.rows = 3;
  textarea.oninput = () => {
    note.text = textarea.value;
    onUpdate(note);
  };
  noteDiv.appendChild(textarea);

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'absolute top-1 right-1 text-xs text-gray-500 hover:text-red-500';
  delBtn.onclick = () => onDelete(note.id);
  noteDiv.appendChild(delBtn);

  // Drag logic
  let offsetX = 0, offsetY = 0, dragging = false;
  noteDiv.onmousedown = (e) => {
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    dragging = true;
    offsetX = e.clientX - noteDiv.offsetLeft;
    offsetY = e.clientY - noteDiv.offsetTop;
    document.body.style.userSelect = 'none';
  };
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    noteDiv.style.left = (e.clientX - offsetX) + 'px';
    noteDiv.style.top = (e.clientY - offsetY) + 'px';
  });
  document.addEventListener('mouseup', (e) => {
    if (dragging) {
      dragging = false;
      note.x = noteDiv.offsetLeft;
      note.y = noteDiv.offsetTop;
      onUpdate(note);
      document.body.style.userSelect = '';
    }
  });

  return noteDiv;
}

function renderNotes(notes: StickyNote[], onUpdate: (note: StickyNote) => void, onDelete: (id: string) => void) {
  // Remove old notes
  document.querySelectorAll('.webwhiz-sticky-note').forEach((el) => el.remove());
  notes.forEach((note) => {
    const el = createNoteElement(note, onUpdate, onDelete);
    document.body.appendChild(el);
  });
}

export function initStickyNotes() {
  loadNotes((notes) => {
    renderNotes(notes, handleUpdate, handleDelete);
  });

  function handleUpdate(updatedNote: StickyNote) {
    loadNotes((notes) => {
      const idx = notes.findIndex((n) => n.id === updatedNote.id);
      if (idx !== -1) notes[idx] = updatedNote;
      saveNotes(notes);
    });
  }

  function handleDelete(id: string) {
    loadNotes((notes) => {
      const filtered = notes.filter((n) => n.id !== id);
      saveNotes(filtered);
      renderNotes(filtered, handleUpdate, handleDelete);
    });
  }

  // Listen for context menu event from background
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'WEBWHIZ_ADD_NOTE') {
      const note: StickyNote = {
        id: 'note-' + Date.now(),
        text: '',
        x: window.innerWidth / 2 - 60,
        y: window.innerHeight / 2 - 30,
        url: getCurrentUrlKey(),
      };
      loadNotes((notes) => {
        const newNotes = [...notes, note];
        saveNotes(newNotes);
        renderNotes(newNotes, handleUpdate, handleDelete);
      });
    }
  });
} 