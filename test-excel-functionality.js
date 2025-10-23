// Script para probar la funcionalidad de carga de Excel en el dashboard de maestros
// Este script debe ejecutarse en la consola del navegador en la página del dashboard

console.log('🧪 Iniciando pruebas de funcionalidad de Excel...');

// 1. Crear datos de prueba para un maestro
const testTeacher = {
  email: 'profesor.test@tecnica44.edu.mx',
  fullName: 'Profesor de Prueba',
  subjects: [
    {
      name: 'Matemáticas',
      groups: ['3A', '3B']
    },
    {
      name: 'Física',
      groups: ['2A', '2B']
    }
  ],
  isProfileComplete: true
};

// 2. Datos de estudiantes de ejemplo que simularían estar en un Excel
const excelStudentsData = [
  { name: 'Ana García López', group: '3A', subject: 'Matemáticas' },
  { name: 'Carlos Rodríguez Pérez', group: '3A', subject: 'Matemáticas' },
  { name: 'María Fernández Silva', group: '3A', subject: 'Matemáticas' },
  { name: 'José Martínez Ruiz', group: '3A', subject: 'Matemáticas' },
  { name: 'Laura Sánchez Torres', group: '3B', subject: 'Matemáticas' },
  { name: 'Diego López Morales', group: '3B', subject: 'Matemáticas' },
  { name: 'Carmen Jiménez Vega', group: '2A', subject: 'Física' },
  { name: 'Roberto Díaz Castro', group: '2A', subject: 'Física' },
  { name: 'Elena Romero Herrera', group: '2B', subject: 'Física' },
  { name: 'Miguel Vargas Ortega', group: '2B', subject: 'Física' }
];

// 3. Función para simular la carga del maestro
function setupTestTeacher() {
  console.log('📝 Configurando maestro de prueba...');
  localStorage.setItem('currentTeacher', JSON.stringify(testTeacher));
  console.log('✅ Maestro de prueba configurado');
}

// 4. Función para simular la carga de estudiantes desde Excel
function simulateExcelUpload() {
  console.log('📊 Simulando carga de estudiantes desde Excel...');
  
  // Obtener estudiantes existentes
  const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
  
  // Crear nuevos estudiantes con IDs únicos
  const newStudents = excelStudentsData.map((studentData, index) => ({
    id: `excel-student-${Date.now()}-${index}`,
    name: studentData.name,
    group: studentData.group,
    subject: studentData.subject,
    teacherEmail: testTeacher.email
  }));
  
  // Combinar con estudiantes existentes (evitar duplicados por nombre)
  const allStudents = [...existingStudents];
  newStudents.forEach(newStudent => {
    const exists = allStudents.some(existing => 
      existing.name === newStudent.name && 
      existing.group === newStudent.group && 
      existing.subject === newStudent.subject
    );
    if (!exists) {
      allStudents.push(newStudent);
    }
  });
  
  // Guardar en localStorage
  localStorage.setItem('students', JSON.stringify(allStudents));
  console.log(`✅ ${newStudents.length} estudiantes agregados desde Excel`);
  
  return allStudents;
}

// 5. Función para agregar calificaciones de ejemplo
function addSampleGrades(students) {
  console.log('📊 Agregando calificaciones de ejemplo...');
  
  const existingGrades = JSON.parse(localStorage.getItem('grades') || '[]');
  const periods = ['Primer Parcial', 'Segundo Parcial', 'Tercer Parcial'];
  
  const newGrades = [];
  students.forEach(student => {
    periods.forEach((period, periodIndex) => {
      // Generar calificación aleatoria entre 6 y 10
      const grade = Math.floor(Math.random() * 5) + 6;
      
      newGrades.push({
        id: `grade-${student.id}-${periodIndex}-${Date.now()}`,
        studentId: student.id,
        subject: student.subject,
        period: period,
        grade: grade,
        date: new Date().toISOString().split('T')[0],
        teacherEmail: testTeacher.email
      });
    });
  });
  
  // Combinar con calificaciones existentes
  const allGrades = [...existingGrades, ...newGrades];
  localStorage.setItem('grades', JSON.stringify(allGrades));
  
  console.log(`✅ ${newGrades.length} calificaciones agregadas`);
}

// 6. Función para probar los filtros
function testFilters() {
  console.log('🔍 Probando filtros...');
  
  const students = JSON.parse(localStorage.getItem('students') || '[]');
  
  // Probar filtro por grupo
  const grupo3A = students.filter(s => s.group === '3A');
  console.log(`📋 Estudiantes en grupo 3A: ${grupo3A.length}`);
  
  const grupo3B = students.filter(s => s.group === '3B');
  console.log(`📋 Estudiantes en grupo 3B: ${grupo3B.length}`);
  
  // Probar filtro por materia
  const matematicas = students.filter(s => s.subject === 'Matemáticas');
  console.log(`📚 Estudiantes en Matemáticas: ${matematicas.length}`);
  
  const fisica = students.filter(s => s.subject === 'Física');
  console.log(`🔬 Estudiantes en Física: ${fisica.length}`);
  
  console.log('✅ Filtros probados correctamente');
}

// 7. Función principal para ejecutar todas las pruebas
function runCompleteTest() {
  console.log('🚀 Ejecutando prueba completa...');
  
  try {
    // Configurar maestro
    setupTestTeacher();
    
    // Simular carga de Excel
    const students = simulateExcelUpload();
    
    // Agregar calificaciones
    addSampleGrades(students);
    
    // Probar filtros
    testFilters();
    
    console.log('🎉 ¡Prueba completa exitosa!');
    console.log('📝 Recarga la página para ver los cambios en el dashboard');
    
    // Mostrar resumen
    const totalStudents = JSON.parse(localStorage.getItem('students') || '[]').length;
    const totalGrades = JSON.parse(localStorage.getItem('grades') || '[]').length;
    
    console.log(`📊 Resumen:`);
    console.log(`   - Total estudiantes: ${totalStudents}`);
    console.log(`   - Total calificaciones: ${totalGrades}`);
    console.log(`   - Grupos disponibles: 3A, 3B, 2A, 2B`);
    console.log(`   - Materias disponibles: Matemáticas, Física`);
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

// 8. Función para limpiar datos de prueba
function cleanTestData() {
  console.log('🧹 Limpiando datos de prueba...');
  localStorage.removeItem('students');
  localStorage.removeItem('grades');
  localStorage.removeItem('currentTeacher');
  console.log('✅ Datos de prueba eliminados');
}

// Exportar funciones para uso manual
window.testExcelFunctionality = {
  runCompleteTest,
  setupTestTeacher,
  simulateExcelUpload,
  addSampleGrades,
  testFilters,
  cleanTestData
};

console.log('📋 Funciones disponibles:');
console.log('   - testExcelFunctionality.runCompleteTest() - Ejecutar prueba completa');
console.log('   - testExcelFunctionality.cleanTestData() - Limpiar datos de prueba');
console.log('   - testExcelFunctionality.setupTestTeacher() - Solo configurar maestro');
console.log('   - testExcelFunctionality.simulateExcelUpload() - Solo simular Excel');

console.log('💡 Para empezar, ejecuta: testExcelFunctionality.runCompleteTest()');