const addbutton = document.querySelector('#add');

const updateLSData = () => {

    const textareadata = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareadata);
    textareadata.forEach((note) => {

        return notes.push(note.value);
    })

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));

}


const addnewnote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
        <div class="opperation">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;
 

    note.insertAdjacentHTML('afterbegin', htmlData)
    // console.log(note);

    
    //for reference---->
    const editbutton = note.querySelector('.edit');
    const delbutton = note.querySelector('.delete');
    const maindiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the node
    delbutton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    // toggle using edit button

    textArea.value = text;
    maindiv.innerHTML = text;


    editbutton.addEventListener('click', () => {
        maindiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        maindiv.innerHTML = value;
        updateLSData();

    })
    document.body.appendChild(note);

}
//  get data back from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => addnewnote(note))
};

addbutton.addEventListener('click', () =>
    addnewnote());