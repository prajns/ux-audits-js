$('#modalExport').on('shown.bs.modal', function (e) 
{
    var cardHeaderUX = document.getElementsByClassName('card-header h3');

    var stringSelectOptions = "<option disabled selected value></option>";

    for(var i=0; i< cardHeaderUX.length; i++)
    {
        var selectOption = "<option value='"+ cardHeaderUX[i].parentNode.id +"'>"+ cardHeaderUX[i].childNodes[0].textContent +"</option>";
        stringSelectOptions += selectOption;
    }

    $('#selectHTML').html(stringSelectOptions);
})

$('#formExport').submit(function() 
{
    var converted = htmlDocx.asBlob(document.getElementById("textAreaHTML").value);
    saveAs(converted, 'Raport UX.docx');
    
    document.getElementById("selectHTML").selectedIndex = "-1";

    $('#modalExport').modal('hide');
    return false;
});

function generateHTML()
{
    var stringHeadHTML = `  <!DOCTYPE HTML>
                            <html>
                                <head>
                                    <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
                                    <style>
                                        @font-face {font-family: 'DejaVu Sans';font-style: normal;font-weight: normal;}
                                        @page { margin: 1.9cm 1.32cm 3.67cm 1.9cm}
                                        .ql-align-center {text-align: center;}
                                        .ql-align-justify {text-align: justify;}
                                        .ql-align-right {text-align: right;}
                                        blockquote {border-left: 4px solid #ccc;margin-bottom: 5px;margin-top: 5px;padding-left: 16px;}
                                        table {width:100%;border-collapse: collapse;}
                                        table, td, th {border: 1px solid black;}
                                        th{text-align: center;}
                                        tr td:nth-child(odd) {padding-left: 0.5cm}
                                        td:nth-child(even) {text-align: center;}
                                        img {min-width: 50%;max-width: 100%;min-height: 30%;max-height: 100%;}
                                        p {margin: 0;padding: 0;}
                                    </style>
                                </head>
                                <body>
                        `;
    var stringBodyHTML = "";
    var stringFooterHTML = "</body></html>"
    var objectFile = findDocument(document.getElementById("selectHTML").value);

    for(i in objectFile["punkty"]) 
    {
        objectFile["punkty"][i].notatki.getContents();
        var contentNotepad = objectFile["punkty"][i].notatki.root.innerHTML;
        var dataTable = objectFile["punkty"][i].lista.getData();

        if(contentNotepad != "<p><br></p>" || (Array.isArray(dataTable) && dataTable.length))
        {
            var namePoint = "<h3>" + objectFile["punkty"][i].nazwaPunktu + "</h3>";
    
            if (Array.isArray(dataTable) && dataTable.length) 
            {
                var stringTable = "<h4>Lista kontrolna</h4><table><tr><th>Kryterium</th><th>Ocena</th></tr>";
    
                for(x in dataTable)
                {
                    if(dataTable[x]["kryterium"] && dataTable[x]["ocena"])
                    {
                        stringTable += "<tr><td>" + dataTable[x]["kryterium"] + "</td><td>" + dataTable[x]["ocena"] + "</td></tr>"
                    }
                }

                if(stringTable > "<h4>Lista kontrolna</h4><table><tr><th>Kryterium</th><th>Ocena</th></tr>")
                {
                    stringTable += "<tr><td>Procent uzyskanych punktów: </td><td>" + objectFile["punkty"][i]["lista"].footerManager.element.innerText.slice(27) + "</td></tr>";
                    stringTable += "</table>";
                }

                if(stringTable != "<h4>Lista kontrolna</h4><table><tr><th>Kryterium</th><th>Ocena</th></tr>" || contentNotepad != "<p><br></p>")
                {
                    stringBodyHTML += namePoint;

                    if(contentNotepad != "<p><br></p>")
                    {
                        stringBodyHTML += "<h4>Analiza heurystyczna</h4>" + contentNotepad;
                    }

                    if(stringTable > "<h4>Lista kontrolna</h4><table><tr><th>Kryterium</th><th>Ocena</th></tr>")
                    {
                        stringBodyHTML += stringTable;   
                    }                    
                }
            }else
            {
                if(contentNotepad != "<p><br></p>")
                {
                    stringBodyHTML += namePoint;

                    if(contentNotepad != "<p><br></p>")
                    {
                        stringBodyHTML += "<h4>Analiza heurystyczna</h4>" + contentNotepad;
                    }                   
                }
            }
        }
    }

    document.getElementById("textAreaHTML").value = stringHeadHTML + stringBodyHTML + stringFooterHTML;
}