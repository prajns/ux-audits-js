function showStartingPage()
{
    var newItemStartPage = {
        type:'component',
        componentName: 'start',
        title: 'O aplikacji',
        componentState: { text: 'strona_poczatkowa' }
    };

    if(myLayout.root.contentItems[0]==null)
    {
        myLayout.root.addChild(newItemStartPage);
    }
    else if(myLayout.root.getItemsById('stos')[0]==null)
    {
        myLayout.root.contentItems[0].addChild(newItemStartPage); 
    }else
    {
        myLayout.root.getItemsById('stos')[0].addChild(newItemStartPage); 
    }

    var scroll = document.getElementsByClassName("gl_start")[0].parentNode;
    scroll.style.overflow="scroll";    
}

function showNotepadPage()
{
    var i = 1;
    idNotepad = 'Notatnik_div_' + document.getElementsByClassName("gl_text").length;

    while(document.getElementById(idNotepad))
    {
        idNotepad = 'Notatnik_div_' + (document.getElementsByClassName("gl_text").length + i);
        i++;
    }

    var newNotepad = {
        type: 'component',
        componentName: 'text',
        height: 31,
        title: 'Notatnik '+ (document.getElementsByClassName("gl_text").length + i),
        componentState: { text: 'Notatnik_div_' }
    };

    if(myLayout.root.contentItems[0]==null)
    {
        myLayout.root.addChild(newNotepad);
    }else
    {
        myLayout.root.contentItems[0].addChild(newNotepad);
    }
    
    var notepad = initializeQuill(idNotepad);

    var objectNotepad = new Notatnik(idNotepad, notepad);

    tabNotepads.push(objectNotepad)

    document.getElementById("btAddNotepad").classList.remove("disabled");

    return notepad;
}

function showPreviewPage()
{
    var newPreview = {
        type: 'component',
        componentName: 'preview',
        title: 'Przeglądarka stron',
        componentState: { text: 'Podgląd_div_' }
    };

    if(myLayout.root.contentItems[0]==null)
    {
        myLayout.root.addChild(newPreview);
    }else
    {
        myLayout.root.contentItems[0].addChild(newPreview);
    }  
}

function loadURL(referenceIFrame, referenceInputURL)
{
    var url = referenceInputURL.value;
    referenceIFrame.setAttribute('src', url);
}

function resetURL(referenceIFrame, referenceInputURL)
{
    var url = referenceInputURL; 

    url.value='';
    referenceIFrame.removeAttribute("src");
}

function showHelpPage()
{
    $('#btHelp').addClass('disabled');
    $('.btLearnMore').addClass('disabled');
    document.getElementById("btHelp")
    document.getElementById("btHelp")


    var newItemHelpPage = {
        type:'component',
        componentName: 'help',
        title: 'Pomoc',
        componentState: { text: 'pomoc' }
    };

    if(myLayout.root.contentItems[0]==null)
    {
        myLayout.root.addChild(newItemHelpPage);
    }
    else if(myLayout.root.getItemsById('stos')[0]==null)
    {
        myLayout.root.contentItems[0].addChild(newItemHelpPage); 
    }else
    {
        myLayout.root.getItemsById('stos')[0].addChild(newItemHelpPage); 
    }
}

function setActiveHelp(clickedLink)
{
    $('.nav-link.text-dark').removeClass('text-dark');
    clickedLink.classList.add("text-dark");
}