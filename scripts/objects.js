var Punkt = function(nazwaPunktu,notatnik, tabela)
{
    this.nazwaPunktu = nazwaPunktu;
    this.notatki = notatnik;
    this.lista = tabela;
}

Punkt.prototype.setNazwaPunktu = function(nazwa)
{
    this.nazwaPunktu=nazwa;
}

var Dokument = function(nazwaDokumentu, id, punkty)
{
    this.nazwaDokumentu = nazwaDokumentu;
    this.idPojemnika = id;
    this.punkty = punkty;
}

Dokument.prototype.setNazwaDokumentu = function(nazwa)
{
    this.nazwaDokumentu=nazwa;
}

function findDocument(id)
{
    for(var i=0; i < tabDocuments.length; i++)
    {
        if(tabDocuments[i]["idPojemnika"]===id)
        {
            return tabDocuments[i];
        }
    }
}

var PunktJSON = function(nazwaPunktu, daneListy)
{
    this.nazwaPunktu = nazwaPunktu;
    this.podpunkty = daneListy;
}

var PunktDokumentuJSON = function(nazwaPunktu, daneEdytor, daneListy)
{
    this.nazwaPunktu = nazwaPunktu;
    this.edytor = daneEdytor;
    this.podpunkty = daneListy;
}

var DaneJSON = function(szablon, nazwaSzablonu, kryteria)
{
    this.szablon = szablon;
    this.nazwaSzablonu = nazwaSzablonu;
    this.kryteria = kryteria;
}

var Notatnik = function(idNotatnika, notatnik)
{
    this.idNotatnika = idNotatnika;
    this.notatnik = notatnik;
}

function findNotepad(id)
{
    for(var i=0; i < tabNotepads.length; i++)
    {
        if(tabNotepads[i]["idNotatnika"]===id)
        {
            return tabNotepads[i];
        }
    }
}