const tHeadRow=document.getElementById("table-heading-row");
const tBodyRow=document.getElementById("table-body-row")
const boldButton=document.getElementById("bold_btn");
const italicButton=document.getElementById("italic_btn");
const underLineButton=document.getElementById("underline_btn");
const leftAlign=document.getElementById("left-align");
const centerAlign=document.getElementById("center-align");
const rightAlign=document.getElementById("right-align");
const fontSizeButton=document.getElementById("font-size");
const fontStyleButton=document.getElementById("font-style")

const bgColorButton=document.getElementById("bg-color");
const textColorButton=document.getElementById("text-color");

const cutButton=document.getElementById("cut-btn");
const copyButton=document.getElementById("copy-btn");
const pasteButton=document.getElementById("paste-btn");


const current_cell_id=document.getElementById("current-cell")

const uploadJsonFile=document.getElementById("jsonfile");
const addSheetButton=document.getElementById("add-sheet-Button");
let buttonContainer=document.getElementById("button-container");
const arrMatrix='arrMatrix';




let cutCell={};
let lastStateButton;
let currentCell;
let columns=26;
let rows=100;

let numSheets=1;
let currSheetNum=1;

//these three function place major role in this project

// addSheet.addEventListener("click",()=>{
   
//     let sheet=document.createElement("button");
//     numsSheet++


//     currentSheetNum=numsSheet;
//     sheet.innerText=`Sheet${numsSheet}`
   
//     sheet.setAttribute("id",`Sheet-${currentSheetNum}`)
//     sheet.setAttribute('onclick', 'viewSheet(event)');
    

//     buttonContainer.append(sheet);
//     //to this point
//     console.log(localStorage.getItem(arrMatrix))
//     if(localStorage.getItem(arrMatrix)){
        
//         var oldMatrix=localStorage.getItem(arrMatrix);
//         console.log(oldMatrix)
//         console.log("retriving")

//         var newMatrix=[...JSON.parse(oldMatrix),matrix];
//         // console.log(newMatrixArr)

//         localStorage.setItem(arrMatrix,JSON.stringify(newMatrix))

//     }
//     else{
//         console.log("setting")

//         let tempMatrixArr=[matrix];
//         localStorage.setItem(arrMatrix,JSON.stringify(tempMatrixArr))

//     }
//     //claning up my virtual memory
//     for(let row=0;row<rows;row++){
//         matrix[row]=new Array(26)
//         for(let col=0;col<columns;col++){
//             matrix[row][col]={};
//         }
//         // console.log(matrix[i])
//         // console.log(matrix)
//     }
//     document.getElementById("sheet-no").innerText=`Sheet No -${currentSheetNum}`
//     //clening the exsting data
//     tBodyRow.innerHTML=``;

//     //doing same process just like upload and download but we storing in virtual memory i.e localStorage
//     //repeated code
//     for(let row=1;row<=rows;row++){
//         let tr=document.createElement('tr')
//         let th=document.createElement('th');
//         th.innerText=row;
//         //we need append first th in tr after we need put 100 cell in each row
//         tr.append(th)
//         for(let col=0;col<26;col++){
//             let td=document.createElement('td');
//             td.setAttribute('contenteditable','true');
//             td.id=`${String.fromCharCode(col+65)}${row}`
//             td.addEventListener("input",(event)=>onInputFn(event))
//             td.addEventListener('focus',(event)=>onFocusFn(event))
    
    
//             tr.append(td)
        
//         }
        
//         tBodyRow.append(tr);
    
    
//     }

// })
addSheetButton.addEventListener('click', () => {
    const btn = document.createElement('button');
    numSheets++;
    currSheetNum = numSheets;
    btn.innerText = `Sheet ${numSheets}`;
    btn.setAttribute('id', `sheet-${currSheetNum}`);
    btn.setAttribute('onclick', 'viewSheet(event)');
    buttonContainer.append(btn);
    if (localStorage.getItem(arrMatrix)) {
        var oldMatrixArr = localStorage.getItem(arrMatrix);
        // oldMatrixArr -> string
        var newMatrixArr = [...JSON.parse(oldMatrixArr), matrix];
        localStorage.setItem(arrMatrix, JSON.stringify(newMatrixArr));
    } else {
        let tempMatrixArr = [matrix];
        localStorage.setItem(arrMatrix, JSON.stringify(tempMatrixArr));
    }

    // cleanup my virtual memory
    for (let row = 0; row < rows; row++) {
        matrix[row] = new Array(columns);
        for (let col = 0; col < columns; col++) {
            matrix[row][col] = {};
        }
    }
  document.getElementById("sheet-no").innerText=`Sheet No -${currSheetNum}`
  tBodyRow.innerHTML=``;
    // repeated Code please make function (DIY)
    for (let row = 1; row <= rows; row++) { // Row -> 1-100
        // i create a tr
        let tr = document.createElement('tr');
        // number cell
        let th = document.createElement('th');
        // injecting number in th
        th.innerText = row;
        tr.append(th);
        for (let col = 0; col < columns; col++) { //COL-> 0->26 // A->Z
            let td = document.createElement('td');
            td.setAttribute('contenteditable', 'true');
            // unique row and unique col
            // ColRow
            td.setAttribute('id', `${String.fromCharCode(col + 65)}${row}`);
            // this event will revolve around input
            td.addEventListener('input', (event) => onInputFn(event));

            // this event revolves around focus on a cell
            td.addEventListener('focus', (event) => onFocusFn(event));
            tr.append(td);
        }
        tBodyRow.append(tr);
    }

})

function viewSheet(event) {
    let id = event.target.id.split('-')[1];
    var matrixArr = JSON.parse(localStorage.getItem(arrMatrix));
    matrix = matrixArr[id - 1];
    // current matrix points towards the latest currentSheet;
    // clean previousTable
    tBodyRow.innerHTML = ``;
    // repeated Code please make function (DIY)
    for (let row = 1; row <= rows; row++) { // Row -> 1-100
        // i create a tr
        let tr = document.createElement('tr');
        // number cell
        let th = document.createElement('th');
        // injecting number in th
        th.innerText = row;
        tr.append(th);
        for (let col = 0; col < columns; col++) { //COL-> 0->26 // A->Z
            let td = document.createElement('td');
            td.setAttribute('contenteditable', 'true');
            // unique row and unique col
            // ColRow
            td.setAttribute('id', `${String.fromCharCode(col + 65)}${row}`);
            // this event will revolve around input
            td.addEventListener('input', (event) => onInputFn(event));

            // this event revolves around focus on a cell
            td.addEventListener('focus', (event) => onFocusFn(event));
            tr.append(td);
        }
        tBodyRow.append(tr);
    }
    matrix.forEach(row => {
        row.forEach(cell => {
            if (cell.id) {
                var myCell = document.getElementById(cell.id);
                myCell.innerText = cell.text;
                myCell.style.cssText = cell.style;
            }
        })
    })
    currSheetNum=id;
    document.getElementById("sheet-no").innerText=`Sheet No -${currSheetNum}`
}
// function viewSheet(event){
//     let id=event.target.id.split('-')[1]
//     console.log(id)
// }

//No1 

function  uploadFileFn(event){
    // console.log(event)//to what event occured
    // console.log(event.target.files)
    const file=event.target.files[0];
    if(file){
        const reader=new FileReader();
        reader.readAsText(file);
        //how u trigger a reader
        //.readAsText method will trigger reader
        //.onLoad having my default function

        reader.onload=function(e){
            // console.log(e.target.result)
            const fileContent=e.target.result;
            try{
                matrix1=JSON.parse(fileContent)
                matrix1.forEach(row=>{
                    // console.log(row)
                    row.forEach(cell=>{
                        // console.log(cell)
                        if(cell.id){
                            console.log(cell)
                            let cellToBeEdited=document.getElementById(cell.id);
                            // cellToBeEdited.id=cell.id;
                            cellToBeEdited.innerText=cell.text;
                            cellToBeEdited.style.cssText=cell.style;


                        }
                    })
                })

            }
            catch(error){
                console.log(error)
            }
        }
    }
    // console.log(file)


}
//No2

function updatedMatrix(currentCell){
    let tempObj={
        style:currentCell.style.cssText,
        text:currentCell.innerText,
        id:currentCell.id,
    }
    // console.log(tempObj)
    let tempid=currentCell.id[0];
    let j=tempid.charCodeAt(0)-65;
  
    
    let i=currentCell.id.substr(1)-1;
    console.log(i,j)
    matrix[i][j]=tempObj;
    console.log(matrix)
    //matrix is created for the sake of upload and download
   
}
//No3

function downloadFn(){
    const matrixString=JSON.stringify(matrix);

    const blob=new Blob([matrixString], {type:'application/json'});

    let link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
  
    link.download='table.json'
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


}



//for creating column with alpahbets in excel sheet
for(let col=0;col<columns;col++){
    let th=document.createElement('th');
   
    
    
    th.innerHTML=String.fromCharCode(col+65)
    tHeadRow.append(th)

}

//for creating row with numbers in excel sheet
for(let row=1;row<=rows;row++){
    let tr=document.createElement('tr')
    let th=document.createElement('th');
    th.innerText=row;
    //we need append first th in tr after we need put 100 cell in each row
    tr.append(th)
    for(let col=0;col<26;col++){
        let td=document.createElement('td');
        td.setAttribute('contenteditable','true');
        td.id=`${String.fromCharCode(col+65)}${row}`
        td.addEventListener("input",(event)=>onInputFn(event))
        td.addEventListener('focus',(event)=>onFocusFn(event))


        tr.append(td)
    
    }
    
    tBodyRow.append(tr);


}

let matrix=new Array(rows);
for(let row=0;row<rows;row++){
    matrix[row]=new Array(26)
    for(let col=0;col<columns;col++){
        matrix[row][col]={};
    }
    // console.log(matrix[i])
    // console.log(matrix)
}

function onInputFn(event){
    // console.log(event.target)
    updatedMatrix(event.target)
}

//if upload and download the data this matrix will tell where to store the data in excel sheet


function onFocusFn(event){
    event.preventDefault();
    currentCell=event.target;//currentcell updated with to target element
    // console.log(currentCell.id)
    current_cell_id.innerText=currentCell.id;

}



uploadJsonFile.addEventListener("change",uploadFileFn)



//bold Text
boldButton.addEventListener("click",()=>{
    if(currentCell.style.fontWeight==='bold'){
        currentCell.style.fontWeight='normal'
        boldButton.style.backgroundColor='whitesmoke';
        
    }
    else{
        currentCell.style.fontWeight='bold';
        boldButton.style.backgroundColor='#008b8b';


    }
    updatedMatrix(currentCell)
})

//Italic Text
italicButton.addEventListener("click",()=>{
    if(currentCell.style.fontStyle==='italic'){
        currentCell.style.fontStyle='normal'
        italicButton.style.backgroundColor='whitesmoke';

    }
    else{
        currentCell.style.fontStyle='italic'
        italicButton.style.backgroundColor='#008b8b';



    }
    updatedMatrix(currentCell)
})

//underline Text
underLineButton.addEventListener("click",()=>{
    if(currentCell.style.textDecoration==='underline'){
        currentCell.style.textDecoration='none'
        underLineButton.style.backgroundColor='whitesmoke';

    }
    else{
        currentCell.style.textDecoration='underline'
        underLineButton.style.backgroundColor='#008b8b';



    }
    updatedMatrix(currentCell)
})

//text align
leftAlign.addEventListener("click",()=>{
    currentCell.style.textAlign='left',
    updatedMatrix(currentCell)
})

centerAlign.addEventListener("click",()=>{
    currentCell.style.textAlign='center'
    updatedMatrix(currentCell)

})
rightAlign.addEventListener("click",()=>{
    currentCell.style.textAlign='right'
    updatedMatrix(currentCell)

})

//setting font-size
fontSizeButton.addEventListener("click",(event)=>{
    // console.log(fontSizeButton.value)
    currentCell.style.fontSize=fontSizeButton.value;
    updatedMatrix(currentCell)

    
})

fontStyleButton.addEventListener("click",()=>{
    // console.log(fontStyleButton.value)
    currentCell.style.fontFamily=fontStyleButton.value;
    updatedMatrix(currentCell)

})

bgColorButton.addEventListener("change",()=>{
    currentCell.style.backgroundColor=bgColorButton.value;
    updatedMatrix(currentCell)

})

textColorButton.addEventListener("change",()=>{
    // console.log(textColorButton.value);
    currentCell.style.color=textColorButton.value;
    updatedMatrix(currentCell)

})

//copy paste

cutButton.addEventListener("click",(event)=>{
    // console.log(event.target.style);
    // console.log(currentCell.style)
    console.log(currentCell.style.cssText)
    cutCell={
        style:currentCell.style.cssText,
        text:currentCell.innerText,
    }
    
    currentCell.innerText='';
    currentCell.style.cssText='';
    // stateOfText='cut';
    lastStateButton="cut"
    updatedMatrix(currentCell)



})

copyButton.addEventListener("click",()=>{
    cutCell={
        style:currentCell.style.cssText,
        text:currentCell.innerText,
    }
    lastStateButton='copy'
    updatedMatrix(currentCell)

    
})

pasteButton.addEventListener("click",(event)=>{

    currentCell.innerText=cutCell.text;
    currentCell.style.cssText=cutCell.style;
    if(lastStateButton=='cut'){
        cutCell={
            style:'none',
            text:'',
        };
    }
    updatedMatrix(currentCell)

    
   

})

