#!/bin/bash

# Script para iniciar el backend .NET
# Ejecutar con: ./start-backend.sh

echo "🚀 Iniciando Backend .NET..."
echo ""

# Verificar que .NET SDK está instalado
if ! command -v dotnet &> /dev/null
then
    echo "❌ Error: .NET SDK no está instalado"
    echo "Por favor, completa la instalación de .NET SDK primero"
    echo "Ejecuta: brew install --cask dotnet-sdk"
    exit 1
fi

echo "✅ .NET SDK detectado: $(dotnet --version)"
echo ""

# Ir al directorio del backend
cd Backend

echo "📦 Restaurando dependencias..."
dotnet restore

echo ""
echo "🔨 Compilando proyecto..."
dotnet build

echo ""
echo "🎯 Iniciando servidor..."
echo "Backend estará disponible en:"
echo "  - API: http://localhost:5000"
echo "  - Swagger: http://localhost:5000/swagger"
echo ""

dotnet run
