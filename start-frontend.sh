#!/bin/bash

# Script para iniciar el frontend React
# Ejecutar con: ./start-frontend.sh

echo "🚀 Iniciando Frontend React..."
echo ""

# Ir al directorio del frontend
cd frontend

echo "📦 Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
fi

echo ""
echo "🎯 Iniciando servidor de desarrollo..."
echo "Frontend estará disponible en: http://localhost:5173"
echo ""

npm run dev
