var tabDocuments = [];
var tabNotepads = [];
var countUX = 0;

function addDocument()
{
    bootbox.confirm({
        message: "<form class='form'>\
                    <div class='form-group'>\
                        <label>Nazwa pliku: </label>\
                        <input type='text' class='form-control' id='nameNewFile'></input>\
                    </div>\
                    <div class='form-group'>\
                        <label>Szablon:</label>\
                        <select class='form-control' id='nameTemplate'>\
                            <option value='pusty'>Pusty</option>\
                            <option value='nielsen'>10 Heurystyk Nielsena</option>\
                            <option value='sklep'>Sklep internetowy</option>\
                            <option value='forum'>Forum dyskusyjne</option>\
                        </select>\
                    </div>\
                </form>",
        buttons: {
            confirm: {
                label: 'Ok',
                className: 'btn-success'
            },
            cancel: {
                label: 'Anuluj',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result===true)
            {
                var nameDocument = document.getElementById('nameNewFile').value;
                if(nameDocument === "") 
                {
                    $.confirm({
                        title: 'Podaj nazwę dokumentu!',
                        content: 'Musisz podać nazwę nowego dokumentu',
                        type: 'red',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Ok: {
                                text: 'Ok'
                            }
                        }
                    });           
                }else if(nameDocument) 
                {
                    var patt = new RegExp(/^[\w\s\\u0000-~\u0080-þĀ-žƀ-ɎḀ-ỾⱠ-\u2c7e꜠-ꟾ]+$/);
                    var res = patt.test(nameDocument);

                    if(!res){
                        $.confirm({
                            title: 'Błędna nazwa!',
                            content: 'Nazwa dokumentu może składać się jedynie z liter, liczb oraz spacji!',
                            type: 'red',
                            backgroundDismiss: true,
                            typeAnimated: true,
                            closeIcon: true,
                            buttons: {
                                Ok: {
                                    text: 'Ok'
                                }
                            }
                        });                          
                    }else
                    {
                        if (/\s/.test(nameDocument)) 
                        {
                        var nameID = nameDocument.replace(/\s/g, "_");
                        }else
                        {
                            var nameID = nameDocument;
                        }
    
                        var nameContainer = 'ux_' + nameID + '_div_' + countUX;
    
                        countUX++;
    
                        var newItemConfig = {
                            title: nameDocument,
                            type: 'component',
                            componentName: 'ux',
                            componentState: { text: nameContainer }
                        };
    
                        if(myLayout.root.contentItems[0]==null)
                        {
                            myLayout.root.addChild(newItemConfig);
                        }
                        else if(myLayout.root.getItemsById('stos')[0]==null)
                        {
                            myLayout.root.contentItems[0].addChild(newItemConfig); 
                        }else
                        {
                            myLayout.root.getItemsById('stos')[0].addChild(newItemConfig); 
                        }

                        document.getElementById("btExport").classList.remove("disabled");
                        document.getElementById("btSaveTemplate").classList.remove("disabled");
                        document.getElementById("btSaveDocument").classList.remove("disabled");
    
                        addStructure(document.getElementById('nameTemplate').value, nameContainer, nameDocument);
    
                        var x = document.getElementsByClassName("gl_ux").length;
                        for(var i=0; i<x; i++)
                        {
                            document.getElementsByClassName("gl_ux")[i].parentNode.style.overflowY="scroll";
                        }

                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }else 
                {
                    return false;
                }                
            }
        }
    });
}

function addStructure(nameLocalTemplate, nameUxContainer, nameDocument)
{
    var listStructure = document.createElement("ul");
    listStructure.classList.add('list-group','list-group-flush');

    var divList = document.createElement("div");
    divList.classList.add('ux-list-container');

    var listHeader = document.createElement("div");
    listHeader.classList.add('card-header','h3');
    listHeader.style.borderRadius="0px";
    listHeader.textContent=nameDocument;

    var horizontalLine = document.createElement("hr");
    listHeader.appendChild(horizontalLine);

    addHeaderButtonGroup(listHeader);

    document.getElementById(nameUxContainer).appendChild(listHeader);

    var objectTemplates = JSON.parse(JSONtemplates);
    var idTemplate;

    for (var i = 0; i < objectTemplates.wbudowaneSzablony.length; i++)
    {
        if (objectTemplates.wbudowaneSzablony[i].nazwaSzablonu == nameLocalTemplate)
        {
            idTemplate = i;
        }
    }

    var tablicaPunktow = [];

    for (i in objectTemplates.wbudowaneSzablony[idTemplate].punkty) 
    {
        var namePoint = objectTemplates.wbudowaneSzablony[idTemplate].punkty[i].nazwaPunktu;

        var pointList = document.createElement("li");
        pointList.style.borderRadius = "0px";  

        var contentPoint = document.createElement("p");
        contentPoint.classList.add('h5');

        pointList.classList.add('list-group-item');
        contentPoint.innerHTML=namePoint;   

        pointList.appendChild(contentPoint);
        listStructure.appendChild(pointList);

        var idCollapseDiv = nameUxContainer+'_zwijany_'+i;

        addPointButtonGroup(pointList, idCollapseDiv);

        var structureSmallPoints = objectTemplates.wbudowaneSzablony[idTemplate].punkty[i].podpunkty;

        tablicaPunktow.push(addCollapseContent(pointList, namePoint, idCollapseDiv, structureSmallPoints)); 
    }

    var doc = new Dokument(nameDocument, nameUxContainer , tablicaPunktow);

    tabDocuments.push(doc);

    document.getElementById(nameUxContainer).appendChild(listStructure);
}

function addHeaderButtonGroup(referenceCardHeader)
{
    var headerButtonGroup = document.createElement("div");
    headerButtonGroup.classList.add('btn-group','btn-group-sm');
    headerButtonGroup.style.display = "block";

    var btnEdit = document.createElement("button");
    btnEdit.classList.add('btn','btn-primary');
    btnEdit.innerHTML='<i class="far fa-edit"></i> Zmień nazwę';
    btnEdit.addEventListener("click", function(){
        editHeader(referenceCardHeader);
    });

    headerButtonGroup.appendChild(btnEdit);

    var btnAdd = document.createElement("button");
    btnAdd.classList.add('btn','btn-success');
    btnAdd.innerHTML='<i class="fas fa-plus"></i> Dodaj punkt';
    btnAdd.addEventListener("click", function(){
        addPoint(this, referenceCardHeader.parentElement);
    });

    headerButtonGroup.appendChild(btnAdd);

    var btnSaveAll = document.createElement("button");
    btnSaveAll.classList.add('btn','btn-warning');
    btnSaveAll.innerHTML='<i class="far fa-save"></i> Zapisz listy kontrolne';
    btnSaveAll.addEventListener("click", function(){
        var nameSheet = referenceCardHeader.childNodes[0].textContent;

        var tabTabulators = referenceCardHeader.parentNode.querySelector("ul").getElementsByClassName("tabulator");

        var sheets = {};

        for (var i=0; i<tabTabulators.length; i++) 
        {
            var k = "Skoroszyt"+i;
            var v = (tabTabulators[i].id).toString();

            sheets[k] = "#" + v;
        }

        var divTemporary = document.createElement("div");
        divTemporary.id = "divTemporary";
    
        referenceCardHeader.appendChild(divTemporary);

        var tempData=[
            {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
        ]

        var table = new Tabulator("#divTemporary", {
            data: tempData,
            columns:[
                {title:"tmp", field:"tmp", editor:"input"},
            ],
        });

        table.download("xlsx", nameSheet + ".xlsx", {sheets:sheets});

        referenceCardHeader.removeChild(divTemporary);
    });

    headerButtonGroup.appendChild(btnSaveAll);

    referenceCardHeader.appendChild(headerButtonGroup);
}

function addCollapseContent(referenceList, namePoint, idCollapseDiv, structureSmallPoints)
{
    var divCollapse = document.createElement("div");
    divCollapse.classList.add('collapse');
    divCollapse.id = idCollapseDiv;

    referenceList.appendChild(divCollapse);

    var divCollapseContent = document.createElement("div");

    divCollapse.appendChild(divCollapseContent);

    var horizontalLine = document.createElement("hr");
    divCollapseContent.appendChild(horizontalLine);

    var idNotepad = idCollapseDiv + '_notepad';

    var divNotepad = document.createElement("div");
    divNotepad.classList.add("notatnik");
    divCollapseContent.appendChild(divNotepad);

    var divNotepadToolbar = document.createElement("div");
    divNotepadToolbar.id = idNotepad +'_toolbar';
    divNotepad.appendChild(divNotepadToolbar);

    $(divNotepadToolbar).html( "\
        <span class='ql-formats'>\
            <select class='ql-header' data-toggle='tooltip' data-placement='top' title='Rozmiar czcionki'>\
                <option value='false'>Normalny</option>\
                <option value='1'>Nagłówek 1</option>\
                <option value='2'>Nagłówek 2</option>\
                <option value='3'>Nagłówek 3</option>\
                <option value='4'>Nagłówek 4</option>\
                <option value='5'>Nagłówek 5</option>\
                <option value='6'>Nagłówek 6</option>\
            </select>\
        </span>\
        <span class='ql-formats'>\
            <select class='ql-color' data-toggle='tooltip' data-placement='top' title='Kolor tekstu'></select>\
            <select class='ql-background' data-toggle='tooltip' data-placement='top' title='Kolor wyróżnienia tekstu'></select>\
        </span>\
        <span class='ql-formats'>\
            <button class='ql-bold' data-toggle='tooltip' data-placement='top' title='Pogrubienie'></button>\
            <button class='ql-italic' data-toggle='tooltip' data-placement='top' title='Kursywa'></button>\
            <button class='ql-underline' data-toggle='tooltip' data-placement='top' title='Podkreślenie'></button>\
            <button class='ql-strike' data-toggle='tooltip' data-placement='top' title='Przekreślenie'></button>\
        </span>\
        <span class='ql-formats'>\
            <button class='ql-align' data-toggle='tooltip' data-placement='top' title='Wyrównaj do lewej'></button>\
            <button class='ql-align' value='center' data-toggle='tooltip' data-placement='top' title='Wyśrodkuj'></button>\
            <button class='ql-align' value='right' data-toggle='tooltip' data-placement='top' title='Wyrównaj do prawej'></button>\
            <button class='ql-align' value='justify' data-toggle='tooltip' data-placement='top' title='Wyjustuj'></button>\
        </span>\
        <span class='ql-formats'>\
            <button class='ql-blockquote' data-toggle='tooltip' data-placement='top' title='Blok cytatu'></button>\
            <button class='ql-script' value='sub' data-toggle='tooltip' data-placement='top' title='Indeks dolny'></button>\
            <button class='ql-script' value='super' data-toggle='tooltip' data-placement='top' title='Indeks górny'></button>\
        </span>\
        <span class='ql-formats'>\
            <button class='ql-list' value='ordered' data-toggle='tooltip' data-placement='top' title='Lista numerowana'></button>\
            <button class='ql-list' value='bullet' data-toggle='tooltip' data-placement='top' title='Lista punktowana'></button>\
        </span>\
        <span class='ql-formats'>\
            <button class='ql-image' data-toggle='tooltip' data-placement='top' title='Wstaw obraz'></button>\
        </span>\
    ");    

    var divNotepadContent = document.createElement("div");
    divNotepadContent.id = idNotepad;
    divNotepad.appendChild(divNotepadContent);    
    
    var referenceNotepad= new Quill(divNotepadContent, {
        modules: {
            toolbar: divNotepadToolbar,
            history: {
                delay: 2000,
                maxStack: 500,
                userOnly: true
            },
            imageDrop: true,
        },
        placeholder: 'Wprowadź tekst...',
        theme: 'snow'
    });

    var horizontalLine = document.createElement("hr");
    divCollapseContent.appendChild(horizontalLine);

    var bntGroupTabulator = document.createElement("div");
    bntGroupTabulator.classList.add('btn-group','btn-group-sm');

    divCollapseContent.appendChild(bntGroupTabulator);

    var divTabulator = document.createElement("div");
    divTabulator.classList.add('table-sm','table-striped','table-bordered');
    divTabulator.innerHTML=' ';
    divTabulator.id = idCollapseDiv + '_tabela';
    divTabulator.style.paddingTop='1em';

    divCollapseContent.appendChild(divTabulator);

    var listStructure = initializeTable(divTabulator, structureSmallPoints);

    var btnAddTabulator = document.createElement("button");
    btnAddTabulator.classList.add('btn','btn-sm','btn-success');
    btnAddTabulator.innerHTML='<i class="fas fa-plus"></i> Dodaj kryterium';
    btnAddTabulator.addEventListener("click", function(){
        listStructure.addRow({});
    });

    bntGroupTabulator.appendChild(btnAddTabulator);

    var btnUndoTabulator = document.createElement("button");
    btnUndoTabulator.classList.add('btn','btn-sm','btn-secondary');
    btnUndoTabulator.innerHTML='<i class="fas fa-undo"></i> Cofnij';
    btnUndoTabulator.addEventListener("click", function(){
        var undoCount = listStructure.getHistoryUndoSize();
        if(undoCount)
        {
            listStructure.undo(); 
        }
    });

    bntGroupTabulator.appendChild(btnUndoTabulator);
    
    var btnRedoTabulator = document.createElement("button");
    btnRedoTabulator.classList.add('btn','btn-sm','btn-secondary');
    btnRedoTabulator.innerHTML='<i class="fas fa-redo"></i> Ponów';
    btnRedoTabulator.addEventListener("click", function(){
        var redoCount = listStructure.getHistoryRedoSize();
        if(redoCount)
        {
            listStructure.redo();
        }
    });

    bntGroupTabulator.appendChild(btnRedoTabulator);
    
    var btnSaveAsXSLT = document.createElement("button");
    btnSaveAsXSLT.classList.add('btn','btn-sm','btn-warning');
    btnSaveAsXSLT.innerHTML='<i class="far fa-file-excel"></i> Zapisz';
    btnSaveAsXSLT.addEventListener("click", function(){
        listStructure.download("xlsx", namePoint + ".xlsx", {sheetName: "Lista kontrolna"});
    });

    bntGroupTabulator.appendChild(btnSaveAsXSLT);

    return new Punkt(namePoint, referenceNotepad, listStructure);
}

function initializeTable(idTable, structureSmallPoints)
{
    var btnDelete = function(){return "<i class='fas fa-times' style='color:#dc3545' data-toggle='tooltip' data-placement='top' title='Kliknij, aby usunąć wiersz'></i>";};

    var info = function()
    {
        return "Procent uzyskanych punktów: ";
    }

    var calculatePercent = function(values)
    {
        var percent = 0;
        var sum= 0;
        var numberPoints = values.length;

        values.forEach(function(value)
        {
            if(!isNaN(value))
            {
                sum+=parseInt(value);
            }else{
                numberPoints--;
            }
        });

        percent = (sum+numberPoints)/(2*numberPoints);

        percent = (percent*100).toPrecision(3);

        if(isNaN(percent))
        {
            return '';
        }else{
            return percent + '%';
        }
    }

    var table = new Tabulator(idTable, {
    height:"100%",
    layout:"fitColumns",
    history:true,
    addRowPos:"top",
    data: structureSmallPoints,
    tooltips: "Kliknij na komórce, w celu edycji",
    clipboard:true,
    columns:[
        {title:"Kryterium", field:"kryterium", editor:"input", bottomCalc:info, widthGrow:6},
        {title:"Ocena", field:"ocena", align:"center", bottomCalc: calculatePercent, widthGrow:2, editor:"select", editorParams:{values:["-1", "0", "1"]}},
        {title:"<i class='far fa-trash-alt'></i>", formatter:btnDelete, widthGrow:1, align:"center", cellClick:function(e, cell){cell.getRow().delete()}, resizable:false, headerSort:false}
    ]
    });

    return table;
}

function addPoint(referenceButtonAddPoint, referenceUxContainer)
{
    referenceButtonAddPoint.disabled = true;

    var pointList = document.createElement("li");
    pointList.classList.add('list-group-item');

    var btnGroupEditHeaderContainer = document.createElement("div");
    btnGroupEditHeaderContainer.classList.add('input-group');

    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control","input-lg");

    btnGroupEditHeaderContainer.appendChild(input);

    var btnGroupEditHeader = document.createElement("div");
    btnGroupEditHeader.classList.add('input-group-append','btn-group-sm');

    var btnAccept = document.createElement("button");
    btnAccept.classList.add('btn','btn-success');
    btnAccept.innerHTML='<i class="fas fa-check"></i> Dodaj';
    btnAccept.addEventListener("click", function(){
        var elementEditableText = input.value;
        if(elementEditableText === "") 
        {
            $.confirm({
                title: 'Błędna nazwa!',
                content: 'Musisz podać treść punktu',
                type: 'red',
                backgroundDismiss: true,
                typeAnimated: true,
                closeIcon: true,
                buttons: {
                    Ok: {
                        text: 'Ok'
                    }
                }
            });   
        }else if(elementEditableText)
        {
            btnGroupEditHeaderContainer.remove();
            input.remove();
   
            var contentPoint = document.createElement("p");
            contentPoint.classList.add('h5');
            
            contentPoint.textContent=elementEditableText;        
    
            pointList.appendChild(contentPoint);     
            
            addPointButtonGroup(pointList, referenceUxContainer.parentNode.parentNode.id+'_zwijany_'+referenceUxContainer.childNodes[1].childElementCount+'_tabela');

            var objectTemplates = JSON.parse(JSONtemplates);

            var structureSmallPoints = objectTemplates.wbudowaneSzablony[0].punkty[0].podpunkty;

            var point = addCollapseContent(pointList, elementEditableText ,referenceUxContainer.parentNode.parentNode.id+'_zwijany_'+referenceUxContainer.childNodes[1].childElementCount+'_tabela', structureSmallPoints);

            var doc = findDocument(referenceUxContainer.id);

            doc["punkty"].unshift(point);

            referenceButtonAddPoint.disabled = false;

            var referencebtnSaveAll = referenceUxContainer.getElementsByClassName('btn-warning')[0];

            if(referencebtnSaveAll.disabled)
            {
                referencebtnSaveAll.disabled = false;
            }
        }else
        {
            return false;
        }
    });

    btnGroupEditHeader.appendChild(btnAccept);

    var btnCancel = document.createElement("button");
    btnCancel.classList.add('btn','btn-danger');
    btnCancel.innerHTML='<i class="fas fa-times"></i> Anuluj';
    btnCancel.addEventListener("click", function(){
        referenceButtonAddPoint.disabled = false;
        pointList.remove();      
    });    
    btnGroupEditHeader.appendChild(btnCancel);

    btnGroupEditHeaderContainer.appendChild(btnGroupEditHeader);    

    pointList.appendChild(btnGroupEditHeaderContainer);

    referenceUxContainer.childNodes[1].insertBefore(pointList, referenceUxContainer.childNodes[1].firstChild);
}

function addPointButtonGroup(referenceList, idCollapseDiv)
{
    var headerButtonGroup = document.createElement("div");
    headerButtonGroup.classList.add('btn-group','btn-group-sm');
    headerButtonGroup.style.display = "block";

    var przycisk_zwijanie = document.createElement("button");
    przycisk_zwijanie.classList.add('btn','btn-primary');
    przycisk_zwijanie.setAttribute('data-toggle', 'collapse');
    przycisk_zwijanie.setAttribute('data-target', '#'+idCollapseDiv);

    $(document).ready(function(){
        $('#'+idCollapseDiv).on("shown.bs.collapse", function(){
            window.dispatchEvent(new Event('resize'));
        });
    });

    przycisk_zwijanie.innerHTML='<i class="fas fa-caret-down"></i> Szczegóły';
    przycisk_zwijanie.addEventListener("click", function(){
        if(!document.getElementById(idCollapseDiv).classList.contains('collapsing')){
            przycisk_zwijanie.querySelector('i').classList.toggle('fa-caret-up');
            przycisk_zwijanie.querySelector('i').classList.toggle('fa-caret-down');
        }
    });

    headerButtonGroup.appendChild(przycisk_zwijanie);

    var btnEdit = document.createElement("button");
    btnEdit.classList.add('btn','btn-warning');
    btnEdit.innerHTML='<i class="far fa-edit"></i> Edytuj';
    btnEdit.addEventListener("click", function(){
        if(przycisk_zwijanie.innerHTML==='<i class="fas fa-caret-up"></i> Szczegóły')
        {
            przycisk_zwijanie.click();
        }
        editPoint(referenceList);
    });

    headerButtonGroup.appendChild(btnEdit);

    var btnDelete = document.createElement("button");
    btnDelete.classList.add('btn','btn-danger');
    btnDelete.innerHTML='<i class="fas fa-times"></i> Usuń';
    btnDelete.addEventListener("click", function(){
        $.confirm({
            title: 'Usunąć ten punkt?',
            content: 'Czy na pewno chcesz usunąć ten punkt wraz z całą jego zawartością?',
            type: 'orange',
            backgroundDismiss: true,
            typeAnimated: true,
            closeIcon: true,
            buttons: {
                Tak: {
                    text: 'Tak',
                    btnClass: 'btn-green',
                    action: function(){
                        var doc = findDocument(referenceList.parentNode.parentNode.id);

                        var referenceMainUxDiv = document.getElementById(referenceList.parentNode.parentNode.id);

                        var referencebtnSaveAll = referenceMainUxDiv.getElementsByClassName('btn-warning')[0];

                        for(var i=0; i<headerButtonGroup.parentElement.parentElement.childNodes.length;i++)
                        {
                            if(headerButtonGroup.parentElement===headerButtonGroup.parentElement.parentElement.childNodes[i])
                            {
                                doc["punkty"].splice(i, 1);
                            }
                        }
                        headerButtonGroup.parentElement.remove();

                        if(referenceMainUxDiv.getElementsByTagName('li').length <= 0)
                        {
                            referencebtnSaveAll.disabled = true;
                        }
                    }                            
                },
                Nie: {
                    text: 'Nie',
                    btnClass: 'btn-red',
                }
            }
        });    
    });

    headerButtonGroup.appendChild(btnDelete);

    referenceList.appendChild(headerButtonGroup);
}

function editHeader(refernceCardHeader)
{
    var elementEditable = refernceCardHeader.childNodes[0];
    var elementEditableText = refernceCardHeader.childNodes[0].textContent;
    elementEditable.textContent='';

    refernceCardHeader.childNodes[1].style.display="none";
    refernceCardHeader.childNodes[2].style.display="none";

    var btnGroupEditHeaderContainer = document.createElement("div");
    btnGroupEditHeaderContainer.classList.add('input-group');

    var input = document.createElement("input");
    input.type = "text";
    input.value = elementEditableText;
    input.classList.add("form-control","input-lg");

    btnGroupEditHeaderContainer.appendChild(input);

    var btnGroupEditHeader = document.createElement("div");
    btnGroupEditHeader.classList.add('input-group-append','btn-group-sm');

    var btnAccept = document.createElement("button");
    btnAccept.classList.add('btn','btn-success');
    btnAccept.innerHTML='<i class="fas fa-check"></i> Zmień';
    btnAccept.addEventListener("click", function(){
        if(input.value === "") 
        {
            $.confirm({
                title: 'Błędna nazwa!',
                content: 'Musisz podać nazwę dokumentu',
                type: 'red',
                backgroundDismiss: true,
                typeAnimated: true,
                closeIcon: true,
                buttons: {
                    Ok: {
                        text: 'Ok'
                    }
                }
            });   
        }else if(input.value)
        {
            var gl_tab = refernceCardHeader.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('lm_active')[0];

            gl_tab.setAttribute('title', input.value);
            gl_tab.querySelector('span').innerText=input.value;

            elementEditable.textContent = input.value;
            btnGroupEditHeaderContainer.remove();
            input.remove();
            refernceCardHeader.childNodes[1].style.display="block"; 
            refernceCardHeader.childNodes[2].style.display="block";  

            var doc = findDocument(refernceCardHeader.parentNode.id);
            doc.setNazwaDokumentu(elementEditable.textContent);        
        }else
        {
            return false;
        }
    });
    btnGroupEditHeader.appendChild(btnAccept);

    var btnCancel = document.createElement("button");
    btnCancel.classList.add('btn','btn-danger');
    btnCancel.innerHTML='<i class="fas fa-times"></i> Anuluj';
    btnCancel.addEventListener("click", function(){
        elementEditable.textContent = elementEditableText;
        btnGroupEditHeaderContainer.remove();
        input.remove();
        refernceCardHeader.childNodes[1].style.display="block"; 
        refernceCardHeader.childNodes[2].style.display="block";             
    });    
    btnGroupEditHeader.appendChild(btnCancel);

    btnGroupEditHeaderContainer.appendChild(btnGroupEditHeader);  

    refernceCardHeader.appendChild(btnGroupEditHeaderContainer);    
}

function editPoint(referenceList)
{
    var elementEditable = referenceList.childNodes[0];

    referenceList.childNodes[0].style.display="none";
    referenceList.childNodes[1].style.display="none";

    var btnGroupEditHeaderContainer = document.createElement("div");
    btnGroupEditHeaderContainer.classList.add('input-group');

    var input = document.createElement("input");
    input.type = "text";
    input.value = elementEditable.innerHTML;
    input.classList.add("form-control","input-lg");

    btnGroupEditHeaderContainer.appendChild(input);

    var btnGroupEditHeader = document.createElement("div");
    btnGroupEditHeader.classList.add('input-group-append','btn-group-sm');

    var btnAccept = document.createElement("button");
    btnAccept.classList.add('btn','btn-success');
    btnAccept.innerHTML='<i class="fas fa-check"></i> Zmień';
    btnAccept.addEventListener("click", function(){
        var elementEditableText = input.value;
        if(elementEditableText === "") 
        {
            $.confirm({
                title: 'Błędna nazwa!',
                content: 'Musisz podać treść punktu',
                type: 'red',
                backgroundDismiss: true,
                typeAnimated: true,
                closeIcon: true,
                buttons: {
                    Ok: {
                        text: 'Ok'
                    }
                }
            });  
        }else if(elementEditableText)
        {
            elementEditable.textContent = input.value;
            btnGroupEditHeaderContainer.remove();
            input.remove();
            referenceList.childNodes[0].style.display="inline-block";
            referenceList.childNodes[1].style.display="block";
            
            var doc = findDocument(referenceList.parentNode.parentNode.id);

            for(var i=0; i<referenceList.parentElement.childNodes.length;i++)
            {
                if(referenceList===referenceList.parentElement.childNodes[i])
                {
                    doc["punkty"][i].setNazwaPunktu(elementEditable.textContent);
                }
            }          
        }else
        {
            return false;
        }     
    });
    btnGroupEditHeader.appendChild(btnAccept);

    var btnCancel = document.createElement("button");
    btnCancel.classList.add('btn','btn-danger');
    btnCancel.innerHTML='<i class="fas fa-times"></i> Anuluj';
    btnCancel.addEventListener("click", function(){
        btnGroupEditHeaderContainer.remove();
        input.remove();
        referenceList.childNodes[0].style.display="inline-block";
        referenceList.childNodes[1].style.display="block";           
    });    
    btnGroupEditHeader.appendChild(btnCancel);

    btnGroupEditHeaderContainer.appendChild(btnGroupEditHeader);    

    referenceList.appendChild(btnGroupEditHeaderContainer);  
}