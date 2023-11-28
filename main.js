const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Lue CSV-tiedosto ja tallenna tiedot taulukkoon
const data = [];
const fileContent = fs.readFileSync('kurssiarvosanat.csv', 'utf8');
const rows = fileContent.split('\n');

rows.forEach(row => {
  const [course, student, grade] = row.split(',');
  data.push({ course, student, grade });
});

// Käyttäjän valinta
console.log('Valitse toiminto:');
console.log('1. Hae tietyn kurssin kaikkien osallistujien nimet ja arvosanat');
console.log('2. Hae tietyn opiskelijan kaikki kurssien nimet ja arvosanat');
console.log('3. Hae tietyn opiskelijan arvosana tietyltä kurssilta');

rl.question('Valinta (1/2/3): ', choice => {
  switch (choice) {
    case '1':
      // Hae tietyn kurssin kaikkien osallistujien nimet ja arvosanat
      rl.question('Anna kurssin nimi: ', courseName => {
        const courseData = data.filter(entry => entry.course === courseName);
        printResults(courseData);
        rl.close();
      });
      break;
    case '2':
      // Hae tietyn opiskelijan kaikki kurssien nimet ja arvosanat
      rl.question('Anna opiskelijan nimi: ', studentName => {
        const studentData = data.filter(entry => entry.student === studentName);
        printResults(studentData);
        rl.close();
      });
      break;
    case '3':
      // Hae tietyn opiskelijan arvosana tietyltä kurssilta
      rl.question('Anna opiskelijan nimi: ', studentName => {
        rl.question('Anna kurssin nimi: ', courseName => {
          const grade = getGrade(studentName, courseName);
          console.log(`Arvosana: ${grade}`);
          rl.close();
        });
      });
      break;
    default:
      console.log('Virheellinen valinta.');
      rl.close();
  }
});

// Tulosta tulokset
function printResults(results) {
  if (results.length === 0) {
    console.log('Ei tuloksia.');
  } else {
    results.forEach(entry => {
      console.log(`Kurssi: ${entry.course}, Opiskelija: ${entry.student}, Arvosana: ${entry.grade}`);
    });
  }
}

// Hae tietyn opiskelijan arvosana tietyltä kurssilta
function getGrade(studentName, courseName) {
  const entry = data.find(entry => entry.student === studentName && entry.course === courseName);
  return entry ? entry.grade : 'Ei löytynyt';
}
