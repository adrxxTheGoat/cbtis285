// Script temporal para agregar un maestro de prueba
// Ejecutar en la consola del navegador

// Verificar maestros existentes
console.log('Maestros existentes:', JSON.parse(localStorage.getItem('schoolTeachers') || '[]'));

// Agregar maestro de prueba
const testTeacher = {
  id: 1,
  email: 'maestro@test.com',
  password: '123456',
  fullName: '',
  subjects: [],
  groups: [],
  isProfileComplete: false,
  createdAt: new Date().toISOString()
};

const teachers = JSON.parse(localStorage.getItem('schoolTeachers') || '[]');
const existingTeacher = teachers.find(t => t.email === testTeacher.email);

if (!existingTeacher) {
  teachers.push(testTeacher);
  localStorage.setItem('schoolTeachers', JSON.stringify(teachers));
  console.log('Maestro de prueba agregado:', testTeacher);
} else {
  console.log('El maestro ya existe:', existingTeacher);
}

// Verificar maestros después de agregar
console.log('Maestros después de agregar:', JSON.parse(localStorage.getItem('schoolTeachers') || '[]'));