# Pipeline Builder

A modern, visually stunning pipeline builder for LLM and API workflows. Built with React, React Flow, Zustand, Tailwind CSS, and FastAPI backend.

## Features
- **Drag-and-drop node editor** (Input, Output, LLM, Text, API, Conditional)
- **Resizable, theme-aware nodes** with Catppuccin dark/light mode
- **Custom smooth edges** and animated connections
- **Dynamic text node with variable detection**
- **DAG validation** via FastAPI backend
- **Zoom controls** and minimap
- **Modular, maintainable codebase**

## Getting Started

### Prerequisites
- Node.js (18+ recommended)
- Python 3.9+

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
- App runs at `http://localhost:3000`


### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
- API runs at `http://localhost:8000`

#### Backend Requirements
All backend dependencies are listed in `backend/requirements.txt`:

```
fastapi
uvicorn
pydantic
python-multipart
```

## Project Structure
```
frontend/
  src/
    components/    # UI and React Flow logic
    nodes/          # Node types, BaseNode, styles
    store.js        # Zustand state
    ...
backend/
  main.py          # FastAPI app
```

## Scripts
- `npm start` — Start frontend
- `npm run build` — Production build
- `uvicorn main:app --reload` — Start backend

## Customization
- Add new node types in `src/nodes/`
- Update theme/colors in `tailwind.config.js` and `nodeStyles.js`

## Credits
- [React Flow](https://reactflow.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/)
- [Catppuccin Theme](https://catppuccin.com/)

---

