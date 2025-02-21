const addQuestionBtn = document.getElementById('addQuestionBtn');
const questionsContainer = document.getElementById('questionsContainer');
const questionTemplate = document.getElementById('questionTemplate').content;
let questionCount = 0;
const maxQuestions = 10;

function addQuestion() {
  if (questionCount >= maxQuestions) {
    alert("Ya se han agregado el máximo de 10 preguntas."); return;
  }
  questionCount++;
  const clone = document.importNode(questionTemplate, true);

  clone.querySelectorAll("input, select, label").forEach(element => {
    if(element.id) {
      element.id = element.id.replace("__index__", questionCount);
    }
    if(element.htmlFor) {
      element.htmlFor = element.htmlFor.replace("__index__", questionCount);
    }
  });
  clone.querySelector('.question-number').textContent = questionCount;
  questionsContainer.appendChild(clone);
}

addQuestionBtn.addEventListener('click', addQuestion);

async function getModulo() {
  const urlParams = new URLSearchParams(window.location.search);
  const id_modulo = urlParams.get('id_modulo');
  const responseTitulo = await fetch(`/admin/getModulo/${id_modulo}`);
  const data = await responseTitulo.json();
  const tituloModulo = document.getElementById('tituloNombreEvaluacion');

  tituloModulo.innerHTML = `Evaluacion del modulo: ${data.data[0].titulo}`;
}
getModulo();


// Función para reenumerar las preguntas
/**
function renumberQuestions() {
  const blocks = document.querySelectorAll('.question-block');
  questionCount = 0;
  blocks.forEach((block, index) => {
    questionCount = index + 1;
    const header = block.querySelector('.question-number');
    header.textContent = questionCount;
  });
}
*/

  
/**
  // Agregar botón para remover la pregunta
  const removeBtn = clone.querySelector('.removeQuestionBtn');
  removeBtn.addEventListener('click', () => {
    clone.querySelector('.question-block').remove();
    questionCount--;
  });
*/


/**
document.getElementById('evaluationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Aquí puedes recoger y procesar los datos del formulario
  alert('Evaluación guardada');
  // Opcional: enviar el formulario con fetch o similar
});
 */


/**
  document.getElementById('evaluationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar el envío tradicional

    // Array donde se almacenarán las preguntas
    const questions = [];
    
    // Seleccionar todos los bloques de pregunta
    const questionBlocks = document.querySelectorAll('.question-block');
    
    questionBlocks.forEach((block) => {
      // Obtener el texto de la pregunta
      const pregunta = block.querySelector('[id^="pregunta-"]').value.trim();
      
      // Obtener las alternativas
      const alternativa1 = block.querySelector('[id^="alternativa1-"]').value.trim();
      const alternativa2 = block.querySelector('[id^="alternativa2-"]').value.trim();
      const alternativa3 = block.querySelector('[id^="alternativa3-"]').value.trim();
      const alternativa4 = block.querySelector('[id^="alternativa4-"]').value.trim();
      
      // Obtener la clave o respuesta correcta (valor: "1", "2", "3" o "4")
      const clave = block.querySelector('[id^="clave-"]').value;

      // Construir un objeto para la pregunta
      const questionData = {
        pregunta: pregunta,
        alternativas: [alternativa1, alternativa2, alternativa3, alternativa4],
        respuesta: clave
      };

      questions.push(questionData);
    });

    // Enviar los datos al servidor usando fetch (asegúrate de tener configurado express.json() en tu backend)
    fetch('/ruta-para-guardar-evaluacion', {  // Cambia esta ruta según tu endpoint en Express
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ questions })
    })
    .then(response => response.json())
    .then(data => {
      // Aquí manejas la respuesta del servidor (por ejemplo, mostrar un mensaje de éxito)
      alert('Evaluación guardada con éxito');
    })
    .catch(error => {
      console.error('Error al guardar la evaluación:', error);
    });
  });

**/