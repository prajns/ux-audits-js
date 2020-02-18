var myLayout;

function initializeLayout()
{

    window.onbeforeunload = function()
    {
        return 'Na pewno chcesz opuścić stronę?';
    };

    var config = 
    {
        settings:
        {
            hasHeaders: true,
            constrainDragToContainer: true,
            reorderEnabled: true,
            selectionEnabled: false,
            popoutWholeStack: false,
            blockedPopoutsThrowError: true,
            closePopoutsOnUnload: true,
            showPopoutIcon: false,
            showMaximiseIcon: true,
            showCloseIcon: false
        },
        dimensions: {
            borderWidth: 5,
            minItemHeight: 350,
            minItemWidth: 340,
            headerHeight: 32,
            dragProxyWidth: 300,
            dragProxyHeight: 200
        },
        labels: 
        {
            maximise: 'Maksymalizuj',
            minimise: 'Minimalizuj',
        },    
        content: 
        [{
            type: 'row',
            content:
            [{
                type: 'stack',
                componentName: 'ux',
                width: 45,
                title: 'Audyt ekspercki',
                id: 'stos',
                    content: [
                    {
                        type:'component',
                        componentName: 'start',
                        title: 'O aplikacji',
                        componentState: { text: 'strona_poczatkowa' }
                    }]
            },
            {
                type: 'column',
                content:
                [{
                    type: 'component',
                    componentName: 'text',
                    height: 31,
                    title: 'Notatnik '+ (document.getElementsByClassName("gl_text").length + 1),
                    componentState: { text: 'Notatnik_div_' }
                },
                {
                    type: 'component',
                    componentName: 'preview',
                    title: 'Przeglądarka stron',
                    componentState: { text: 'Podgląd_div_' }
                }]
            }]
        }]           
    };

    myLayout = new GoldenLayout(config, '#goldenLayout');
    var idNotepad;
    
    myLayout.on('tabCreated', function( tab ){
        tab
            .closeElement
            .off( 'click' )
            .click(function(){
                if(tab.contentItem.componentName==="ux")
                {
                    $.confirm({
                        title: 'Zamknąć to okno?',
                        content: 'Możesz stracić niezapisane dane.',
                        type: 'orange',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Tak: {
                                text: 'Tak',
                                btnClass: 'btn-green',
                                action: function(){
                                    var doc = findDocument(tab.contentItem.config.componentState.text);
    
                                    var i = tabDocuments.indexOf(doc);
    
                                    if(i !== -1)
                                    {
                                        tabDocuments.splice(i, 1);
                                    } 

                                    tab.contentItem.remove();

                                    if(document.getElementsByClassName("gl_ux").length === 0)
                                    {
                                        var exportContentItem = myLayout.root.getItemsById("export")[0];
                                        if(exportContentItem)
                                        {
                                            exportContentItem.remove();
                                        }

                                        document.getElementById("btExport").classList.add("disabled");
                                        document.getElementById("btSaveTemplate").classList.add("disabled");
                                        document.getElementById("btSaveDocument").classList.add("disabled");
                                    }
                                }                            
                            },
                            Nie: {
                                text: 'Nie',
                                btnClass: 'btn-red',
                            }
                        }
                    });   
                }else if(tab.contentItem.componentName==="text")
                {
                    $.confirm({
                        title: 'Zamknąć to okno?',
                        content: 'Możesz stracić niezapisane dane.',
                        type: 'orange',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Tak: {
                                text: 'Tak',
                                btnClass: 'btn-green',
                                action: function(){
                                    var not = findNotepad(tab.contentItem.config.componentState.text + (parseInt(tab.contentItem.config.title.slice(8))-1));

                                    var i = tabNotepads.indexOf(not);
                                    if(i !== -1)
                                    {
                                        tabNotepads.splice(i, 1);
                                    } 
    
                                    tab.contentItem.remove();

                                    if(document.getElementsByClassName("gl_text").length === 0)
                                    {
                                        document.getElementById("btAddNotepad").classList.add("disabled");
                                    }
                                }                            
                            },
                            Nie: {
                                text: 'Nie',
                                btnClass: 'btn-red',
                            }
                        }
                    });                     
                }else if(tab.contentItem.componentName==="help")
                {
                    $('#btHelp').removeClass('disabled');
                    $('.btLearnMore').removeClass('disabled');
                    tab.contentItem.remove();
                }
                else
                {
                    tab.contentItem.remove();
                }
        });
    });

    myLayout.on('tabCreated', function( tab ){
        tab
            .closeElement
            .off( 'click' )
            .click(function(){
                if(tab.contentItem.componentName==="ux")
                {
                    $.confirm({
                        title: 'Zamknąć to okno?',
                        content: 'Możesz stracić niezapisane dane.',
                        type: 'orange',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Tak: {
                                text: 'Tak',
                                btnClass: 'btn-green',
                                action: function(){
                                    var doc = findDocument(tab.contentItem.config.componentState.text);
    
                                    var i = tabDocuments.indexOf(doc);
    
                                    if(i !== -1)
                                    {
                                        tabDocuments.splice(i, 1);
                                    } 

                                    tab.contentItem.remove();

                                    if(document.getElementsByClassName("gl_ux").length === 0)
                                    {
                                        var exportContentItem = myLayout.root.getItemsById("export")[0];
                                        if(exportContentItem)
                                        {
                                            exportContentItem.remove();
                                        }

                                        document.getElementById("btExport").classList.add("disabled");
                                        document.getElementById("btSaveTemplate").classList.add("disabled");
                                        document.getElementById("btSaveDocument").classList.add("disabled");
                                    }
                                }                            
                            },
                            Nie: {
                                text: 'Nie',
                                btnClass: 'btn-red',
                            }
                        }
                    });   
                }else if(tab.contentItem.componentName==="text")
                {
                    $.confirm({
                        title: 'Zamknąć to okno?',
                        content: 'Możesz stracić niezapisane dane.',
                        type: 'orange',
                        backgroundDismiss: true,
                        typeAnimated: true,
                        closeIcon: true,
                        buttons: {
                            Tak: {
                                text: 'Tak',
                                btnClass: 'btn-green',
                                action: function(){
                                    var not = findNotepad(tab.contentItem.config.componentState.text + (parseInt(tab.contentItem.config.title.slice(8))-1));

                                    var i = tabNotepads.indexOf(not);
                                    if(i !== -1)
                                    {
                                        tabNotepads.splice(i, 1);
                                    } 
    
                                    tab.contentItem.remove();

                                    if(document.getElementsByClassName("gl_text").length === 0)
                                    {
                                        document.getElementById("btAddNotepad").classList.add("disabled");
                                    }
                                }                            
                            },
                            Nie: {
                                text: 'Nie',
                                btnClass: 'btn-red',
                            }
                        }
                    });                     
                }else if(tab.contentItem.componentName==="help")
                {
                    $('#btHelp').removeClass('disabled');
                    $('.btLearnMore').removeClass('disabled');
                    tab.contentItem.remove();
                }
                else
                {
                    tab.contentItem.remove();
                }
        });
    });

    myLayout.on('componentCreated',function(component) {
        component.container.on('resize',function() {
            if(component.componentName === "text")
            {
                var fullNotepadId = component.container._contentElement[0].children[0].children[0].id;
                fullNotepadId = fullNotepadId.replace("_content-container","");
                getHeightNotepad(fullNotepadId);
            }
        });
    });

    myLayout.registerComponent('ux',function(container, state)
    {
        container.getElement().html("<div id="+ state.text + " class='gl_tab gl_ux'></div");
    });

    myLayout.registerComponent('start',function(container, state)
    {
        container.getElement().html(`
            <div class='gl_tab gl_start'>
                <div class='jumbotron'>
                        <h1 class='display-4'>Pierwsze kroki</h1>
                        <p class='lead'>Aplikacja została stworzona w ramach pracy dyplomowej zatytułowanej <i>'Opracowanie narzędzi do audytu eksperckiego interfejsów użytkownika'</i></p>
                    <hr class='my-4'>
                        <p> Aplikacja ułatwia przeprowadzenie audytu eksperckiego serwisów internetowych z wykorzystaniem analizy heurystycznej i list kontrolnych. Podczas oceny możliwe jest korzystanie z gotowych szablonów, ich modyfikacja oraz stworzenie własnego narzędzia badawczego.
                            Strona ciągle jest rozwijana i niektóre elementy mogą niedziałać w sposób całkowicie poprawny.
                        </p>
                        <a class='btn btn-success btLearnMore' href='#' role='button' onclick="showHelpPage()"><i class='fas fa-info-circle'></i> Dowiedz się więcej</a>
                    <hr class='my-4'>
                        <h5>Szybki start: </h5>
                        <a href="#" onclick="addDocument()"><i class="fas fa-file"></i> Przystąp do nowej oceny eksperckiej...</a><br>
                        <a href="#" onclick="loadDocument()"><i class="fas fa-file-upload"></i> Wczytaj dotychczasowe postępy...</a>

                </div>
            </div>`
        );
    });

    myLayout.registerComponent('text',function(container, state)
    {
        var i = 1;
        idNotepad = state.text + document.getElementsByClassName("gl_text").length;
    
        while(document.getElementById(idNotepad))
        {
            idNotepad = state.text + (document.getElementsByClassName("gl_text").length + i);
            i++;
        }

        container.getElement().html( "\
            <div class='notatnik gl_tab gl_text' style='height: 100%'>\
                <div id=" + idNotepad + "_content-container style='height: 100%'>\
                    <div id=" + idNotepad + "_toolbar>\
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
                    </div>\
                    <div id=" + idNotepad + "></div>\
                </div>\
            </div>");
    });



    myLayout.registerComponent('preview',function(container, state)
    {
        var idIFrame = 'iframeAdres_' + document.getElementsByClassName('gl_preview').length;
        var idInput = 'input_iframeAdres_' + document.getElementsByClassName('gl_preview').length;

        container.getElement().html( "\
        <div id=" + state.text + document.getElementsByClassName("gl_preview").length + " class='gl_tab gl_preview' style='height: 100%;width: 100%;'>\
            <div class='input-group' >\
                <div class='input-group-prepend'>\
                    <div class='input-group-text rounded-0' id='btnGroupAddon'>Wpisz URL:</div>\
                </div>\
                <input type='text' id="+ idInput+ " class='form-control' placeholder='' title='Wprowadź pełny adres strony (zaczynający się od http://www)'>\
                <div class='input-group-append'>\
                    <button class='btn btn-success rounded-0' type='button' onclick='loadURL("+idIFrame+","+idInput+")'><i class='fas fa-sign-in-alt'></i> Załaduj</button>\
                    <button class='btn btn-danger rounded-0' type='button' onclick='resetURL("+idIFrame+","+idInput+")'><i class='fas fa-times'></i></i> Resetuj</button>\
                </div>\
            </div>\
            <div style='height: calc(100% - 1.5em - 0.75rem - 2px);'>\
                <iframe id="+ idIFrame +" height='100%' width='100%' frameBorder='0'><p>Twoja przeglądarka nie umożliwia oglądania podglądu na żywo.</p></iframe>\
            </div>\
        </div>");
    });

    myLayout.registerComponent('help',function(container, state)
    {
        container.getElement().html(`
            <div class="row gl_tab gl_help" style="height:100%;">
                <div class="col-12" style="height:100%;text-align:justify;">
                    <div style="height:100%;overflow-Y:scroll; padding-top: 5px; padding-right: 20px; padding-left: 15px;">
                        <h4>O aplikacji</h4>
                        <ul>
                            <li><h5>Wstęp</h5>
                                <p>
                                    Aplikacja ułatwia przeprowadzenie audytu eksperckiego webowych interfejsów użytkownika <i>(ang. WUI)</i> z wykorzystaniem technik analizy heurystycznej oraz listy kontrolnej.
                                    Podczas oceny możliwe jest korzystanie z gotowych szablonów, ich modyfikacja oraz stworzenie własnego narzędzia badawczego. Wprowadzone dane mogą zostać wyeksportowane do postaci
                                    dokumentu z rozszerzeniem .docx
                                </p>
                                <p>Aplikacja rozpowszechniana jest na licencji <b>MIT</b></p>
                            </li>
                            <li><h5>Możliwości aplikacji</h5>
                                <p style="text-align:justify;">
                                    Serwis składa się z trzech głównych narzędzi, ułatwiających przeprowadzanie oceny eksperckiej. Są to:
                                    <ul>
                                        <li><p><b>Okno audytu eksperckiego</b> - pozwala użytkownikowi kontrolować i uporządkować pracę przy ocenie interfejsu strony internetowej. Przed przystąpieniem do pracy istnieje opcja
                                                                                    wybrania predefiniowanego szablonu, utworzenia pustego pliku bądź wczytania kryteriów z wcześniej zapisanego dokumentu. Ponadto możliwe jest dostosowanie
                                                                                    wymagań pod indywidualne potrzeby za pomocą opcji takich jak dodawanie, usuwanie bądź edytowanie treści punktów.</p>
                                            <p>W ramach tego narzędzia do dyspozycji użytkownika znajduje się <b>prosty edytor tekstu</b>, wraz z najważniejszymi funkcjami takimi jak import obrazów, czy prosta edycja styli. Głównym przeznaczeniem tego elementu
                                                jest dokonanie opisowej części audytu eksperckiego w postaci analizy heurystycznej. Drugim narzędziem jest <b>w pełni funkcjonalna tabela</b>, która odwzorowuje technikę listy kontrolnej. Za jej pomocą użytkownik
                                                może szybko uzyskać ogólną, procentową ocenę danej funkcjonalności. Po kliknięciu w komórkę tabeli możliwa jest edycja jej zawartości. Punkty oceny przyznaje się w zakresie od wartości '-1' co oznacza, że
                                                dane kryterium nie zostało spełnione, przez '0' w przypadku gdy kryterium spełnione zostało częściowo po wartość '1', która symbolizuje w pełni spełnione wymaganie. Wartości wpisane do tabel można w prosty sposób
                                                wyeksportować do pojedynczego pliku arkusza kalkulacyjnego bądź zbiorczego, zawierającego kilka arkuszy z całego dokumentu.</p>
                                            <p>
                                                Jeśli użytkownik nie zakończył pracy nad obecnie opracowywanym dokumentem istnieje możliwość zapisu postępów w formie lokalnego pliku w formacie .json Oprócz tego istnieje możliwość zapisu dokumentu w postaci
                                                szablonu, sprawi to, iż zawartość edytorów tekstowych oraz dokonanych ocen zostaną pominięte. Zachowane zostaną jedynie główne punkty oraz treści kryteriów w tabelach. Po finalnym ukończeniu prac nad danym 
                                                audytem eksperckim istnieje możliwość wyeksportowania danych z dokumentu do zewnętrznego pliku z rozszerzeniem .docx
                                            </p>
                                        </li>
                                        <li><p><b>Okno notatnika</b> - przydatne w przypadku kiedy użytkownik zechce zanotować pewne informacje związane z audytem eksperckim, jednak nie będą one na tyle ważne aby umieszczać je we właściwym dokumencie.
                                            Istnieje możliwość otwierania wielu notatników, jednak należy pamiętać iż jest to niezależny moduł aplikacji i <u>nie jest on automatycznie zapisywany</u>. Aby uzyskać do niego dostęp należy, podobnie jak w przypadku
                                            okna audytu eksperckiego osobno go zapisać oraz wczytać. 
                                        </p></li>
                                        <li><p><b>Okno podglądu na żywo</b> - zintegrowane okno przeglądarki, które umożliwia podgląd danej strony bez konieczności przełączania się pomiędzy zakładkami. W celu połączenia się z daną stroną należy wpisać
                                        pełny adres danej strony (zaczynający się od <i>'https://www.'</i> bądź '<i>http://www.'</i>). Działanie tego komponentu aplikacji jest mocno uzależnione od używanej przeglądarki internetowej oraz strony, 
                                        do której użytkownik pragnie mieć szybki dostęp. Dzieje się tak za sprawą polityki niektórych witryn internetowych, które blokuja próby połączeń za pomocą tego elementu.
                                        </p></li>                                           
                                    </ul>
                                </p>                                 
                            </li>
                            <li><h5>Obecne ograniczenia</h5>
                                <p>Aplikacja jest w fazie ciągłego rozwoju, co oznacza iż mogą pojawiać się pewne błędy. Przed przystąpieniem do pracy nad ważną oceną ekspercką sugeruje się, aby przetestować działanie funkcji takich jak eksport danych.
                                Dokument uzyskany za jego pośrednictwem, może odbiegać nieco wyglądem od treści znajdującej się na stronie. W przypadkach, gdy dany punkt nie został opisany za pomocą edytora tekstowego oraz żaden z kryteriów w odpowiadającej
                                mu tabeli nie został oceniony raport pominie cały punkt. Aplikacja podobnie reaguje w trakcie eksportowania danych z tabeli, jeśli choć jedna komórka nie zostanie uzupełniona to cały wiersz zostanie pominięty w raporcie.</p>
                            </li>
                        </ul>
                        <p style="text-align:center;">Copyright (c) 2019 Kamil Adamus</p>
                    </div>
                </div>
            </div>`
        );
    });

    myLayout.init();

    var notepad = initializeQuill(idNotepad);

    getHeightNotepad(idNotepad);

    var objectNotepad = new Notatnik(idNotepad, notepad);

    tabNotepads.push(objectNotepad)

    var scroll = document.getElementsByClassName("gl_start")[0].parentNode;
    scroll.style.overflowY="scroll";

    $(window).resize(function () 
    {
        myLayout.updateSize();
        getHeightNotepad(idNotepad);
    });
}

$('.dropdown-submenu > a').on("click", function(e) {
    var submenu = $(this);
    $('.dropdown-submenu .dropdown-menu').removeClass('show');
    submenu.next('.dropdown-menu').addClass('show');
    e.stopPropagation();
  });

  $('.dropdown').on("hidden.bs.dropdown", function() {
      $('.dropdown-menu.show').removeClass('show');
  });

function getHeightNotepad(idNotepad)
{
    var notepadArea = document.getElementById(idNotepad);
    var notepadToolbar = document.getElementById(idNotepad + "_toolbar");
    notepadArea.style.height = notepadArea.parentNode.clientHeight - notepadToolbar.clientHeight + "px";
}