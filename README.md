# 🤖 Chat SQL + Embeddings

Este proyecto es un **chat conversacional inteligente** basado en IA, diseñado para responder preguntas en lenguaje natural utilizando dos enfoques principales:

- **Traducción NL → SQL** para acceder directamente a bases de datos.
- **Búsqueda semántica con embeddings** para extraer respuestas desde una base de conocimiento vectorizada.

---

## 🚀 Características

- 🧠 **IA híbrida**: Combina generación de SQL y búsqueda semántica.
- 🛠️ **Modelo propio NL2SQL**: Convierte texto natural en consultas SQL ejecutables sobre la base de datos.
- 📚 **Sistema de recuperación semántica**: Usa embeddings para encontrar respuestas en textos o documentos externos.
- 💬 **Interfaz conversacional**: Interactúa de manera intuitiva con lenguaje humano.
- 🔄 **Contexto dinámico**: Capacidad de seguimiento de contexto entre mensajes.

---

## 🧠 ¿Cómo funciona?

1. **Clasificación de intención**: El sistema detecta si la consulta requiere SQL o búsqueda por embeddings.
2. **Consulta por SQL**:
   - Se activa un modelo propio NL2SQL.
   - Se ejecuta la query contra la base de datos y se retorna el resultado.
3. **Consulta semántica**:
   - Se generan embeddings a partir del input.
   - Se realiza una búsqueda vectorial en la base de conocimiento y se responde con base en los documentos más relevantes.

---

## 🧪 Tecnologías utilizadas

- **Next.js** (interfaz web, opcional)
- **Python + FastAPI** (backend y modelo NL2SQL)
- **Langchain o similar** (para embeddings y RAG)
- **OpenAI / Hugging Face** (para embeddings o modelos auxiliares)
- **PostgreSQL / SQLite** (como motor de base de datos de prueba)
- **FAISS / Chroma** (para el motor vectorial)

---