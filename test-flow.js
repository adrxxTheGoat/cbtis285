// Script para probar el flujo completo de registro y login de maestros
console.log('Iniciando prueba del flujo de maestros...');

// 1. Crear un maestro de prueba
const testTeacher = {
  id: 'test-teacher-' + Date.now(),
  email: 'maestro@test.com',
  password: 'test123',
  isProfileComplete: false,
  createdAt: new Date().toISOString()
};

// Obtener maestros existentes
let teachers = JSON.parse(localStorage.getItem('teachers') || '[]');

// Verificar si ya existe un maestro con este email
const existingTeacher = teachers.find(t => t.email === testTeacher.email);
if (!existingTeacher) {
  teachers.push(testTeacher);
  localStorage.setItem('teachers', JSON.stringify(teachers));
  console.log('Maestro de prueba creado:', testTeacher);
} else {
  console.log('Maestro de prueba ya existe:', existingTeacher);
}

// 2. Simular login
localStorage.setItem('teacherAuthenticated', 'true');
localStorage.setItem('currentTeacher', JSON.stringify(existingTeacher || testTeacher));
console.log('Login simulado exitosamente');

// 3. Verificar estado del perfil
const currentTeacher = JSON.parse(localStorage.getItem('currentTeacher'));
console.log('Estado del perfil completo:', currentTeacher.isProfileComplete);

if (!currentTeacher.isProfileComplete) {
  console.log('El maestro debe completar su perfil');
  console.log('Redirigiendo a /docentes/completar-perfil');
} else {
  console.log('El maestro puede acceder directamente al dashboard');
  console.log('Redirigiendo a /docentes/dashboard');
}

console.log('Prueba completada. Revisa la consola del navegador para más detalles.');