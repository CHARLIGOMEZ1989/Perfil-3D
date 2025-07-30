# 🔒 Security Policy

## 🛡️ Supported Versions

Actualmente estamos dando soporte de seguridad a las siguientes versiones de Soil Profile Pro:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🚨 Reporting a Vulnerability

La seguridad de Soil Profile Pro es importante para nosotros. Si descubres una vulnerabilidad de seguridad, por favor repórtala de manera responsable.

### 📧 Cómo Reportar

1. **NO** abras un issue público para vulnerabilidades de seguridad
2. Envía un email a: [tu-email@example.com] con:
   - Descripción detallada de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Sugerencias de mitigación si las tienes

### ⏱️ Tiempo de Respuesta

- **Confirmación inicial**: Dentro de 48 horas
- **Evaluación detallada**: Dentro de 7 días
- **Fix y disclosure**: Dentro de 30 días (dependiendo de la complejidad)

### 🏆 Reconocimiento

Los investigadores de seguridad que reporten vulnerabilidades válidas serán:
- Reconocidos en el changelog de la release que corrige el issue
- Añadidos a nuestro hall of fame de seguridad (si lo desean)

## 🔐 Security Best Practices para Desarrolladores

Si contribuyes al proyecto, por favor sigue estas mejores prácticas:

### 🚫 Datos Sensibles
- Nunca commits credenciales o claves API
- Usa variables de entorno para información sensible
- Verifica que `.gitignore` incluya archivos sensibles

### 📦 Dependencias
- Mantén las dependencias actualizadas
- Ejecuta `pnpm audit` regularmente
- Revisa advisories de seguridad antes de añadir nuevas dependencias

### 🌐 Frontend Security
- Sanitiza inputs del usuario
- Usa Content Security Policy (CSP) cuando sea apropiado
- Valida datos en el cliente Y servidor
- Mantén actualizadas las librerías de UI

### 🔍 Code Review
- Revisa el código en busca de vulnerabilidades comunes
- Usa herramientas de análisis estático
- Presta atención a la validación de inputs
- Verifica el manejo correcto de errores

## 🛠️ Security Tools

Este proyecto usa las siguientes herramientas de seguridad:

- **CodeQL**: Análisis automático de código para vulnerabilidades
- **Dependabot**: Monitoreo automático de dependencias vulnerables
- **ESLint**: Reglas de linting que incluyen mejores prácticas de seguridad

## 📚 Recursos de Seguridad

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Frontend Security](https://owasp.org/www-project-web-security-testing-guide/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)

## 📞 Contacto

Para preguntas generales sobre seguridad (no vulnerabilidades), puedes:
- Abrir un issue con la etiqueta "security"
- Contactar al mantenedor: [@CHARLIGOMEZ1989](https://github.com/CHARLIGOMEZ1989)

---

**Nota**: Esta política de seguridad está sujeta a cambios. Por favor revísala periódicamente.
