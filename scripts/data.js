var JSONtemplates = `{"wbudowaneSzablony":[
    {"nazwaSzablonu":"pusty",
      "punkty":[
        {"nazwaPunktu":"Przykładowe wymaganie", 
          "podpunkty": [
            {"kryterium":"Przykładowe kryterium"}
          ]
        }
      ]
    },
    {"nazwaSzablonu":"nielsen",
      "punkty":[
        {"nazwaPunktu":"Pokazuj status systemu", 
          "podpunkty": [
            {"kryterium":"Strona korzysta z tzw. okruchów (ang. Breadcrumb)"},
            {"kryterium":"Aktywny odnośnik jest wyróżniony"},
            {"kryterium":"Menu nawigacji jest skonstuowane w czytelny i chronologiczny sposób"},
            {"kryterium":"Nieaktywne linki są ukryte bądź odpowiednio wyróżnione"}
          ]
        },
        {"nazwaPunktu":"Zgodność między systemem, a rzeczywistością",
          "podpunkty": [
            {"kryterium":"Treść strony zrozumiała jest dla wszystkich użytkowników, bez względu na ich wiedzę"},
            {"kryterium":"Strona podaje rzetelne, potwierdzone informacje"},
            {"kryterium":"Do informacji prezentowanych na stronie podane są źródła"}
          ]
        },
        {"nazwaPunktu":"Dowolność i pełna kontrola dla użytkownika", 
          "podpunkty": [
            {"kryterium":"Użytkownik może edytować swoje dane"},
            {"kryterium":"Użytkownik może usunąć swoje konto"},
            {"kryterium":"Użytkownik może wycofać się z wykonywanej operacji lub cofnąć do poprzednich kroków"},
            {"kryterium":"Użytkownik może swobodnie nawigować w obrębie witryny"}
          ]
        },
        {"nazwaPunktu":"Przestrzeganie standardów i spójności",
          "podpunkty": [
            {"kryterium":"Strona trzyma się jednolitej stylistyki"},
            {"kryterium":"Strona opiera się na sprawdzonych i funkcjonalnych rozwiązaniach"},
            {"kryterium":"Strona jest intuicyjna w obsłudze"}
          ]
        },
        {"nazwaPunktu":"Zapobieganie błędom", 
          "podpunkty": [
            {"kryterium":"Użytkownik nie natrafia na żadne błędy ze strony serwisu"},
            {"kryterium":"Użytkownik nie jest przekierowywany na stronę bez możliwości dalszej nawigacji"},
            {"kryterium":"Serwis podpowiada użytkownikowi jak się z nim komunikować (np. wypełniać formularze)"}
          ]
        },
        {"nazwaPunktu":"Identyfikacja zamiast cofania",
          "podpunkty": [
            {"kryterium":"Użytkownik bez konieczności cofania się może uzyskać podsumowanie wykonywanej operacji"},
            {"kryterium":"Użytkownik nie musi pamiętać swoich wyborów, strona robi to za niego"}
          ]
        },
        {"nazwaPunktu":"Elastyczność oraz efektywność", 
          "podpunkty": [
            {"kryterium":"Strona działa poprawnie na urządzeniach mobilnych"},
            {"kryterium":"Strona działa poprawnie w większości przeglądarek internetowych"},
            {"kryterium":"Strona działa poprawnie na innych urządzeniach takich jak np.: telewizorach z funkcją smart"},
            {"kryterium":"Strona posiada ułatwienia dla osób niepełnosprawnych"},
            {"kryterium":"Strona ma zróżnicowane formy przekazu (w tym: wizualizacje)"},
            {"kryterium":"Użytkownik może dostosować sposób prezentowania danych do swoich preferencji"},
            {"kryterium":"Strona funkcjonuje sprawnie (wczytuje się bez opóźnień)"}
          ]
        },
        {"nazwaPunktu":"Estetyka i minimalizm", 
          "podpunkty": [
            {"kryterium":"Strona ogranicza zbędne elementy wizualne"},
            {"kryterium":"Strona wykonana jest estetycznie"},
            {"kryterium":"Treść strony przedstawiona jest w przemyślany sposób"}
          ]
        },
        {"nazwaPunktu":"Obsługa błędów", 
          "podpunkty": [
            {"kryterium":"W przypadku wystąpienia błędu użytkownik dostaje informacje jak go rozwiązać"},
            {"kryterium":"Po wystąpieniu błędu strona jest dalej funkcjonalna"},
            {"kryterium":"Kontakt z administracją w celu naprawy błędy nie jest konieczny"},
            {"kryterium":"Komunikaty o błędach nie wskazują na winę użytkownika"}
          ]
        },
        {"nazwaPunktu":"Pomoc oraz dokumentacja", 
          "podpunkty": [
            {"kryterium":"Strona posiada sekcję z pomocą bądź dokumentacją"},
            {"kryterium":"Strona posiada informacje do kogo zwrócić się w razie trudności w korzystaniu z niej"},
            {"kryterium":"Użytkownik w szybki sposób może odnaleźć poszukiwane informacje"}
          ]
        }
      ]
    },
    {"nazwaSzablonu":"sklep",
      "punkty":[
        {"nazwaPunktu":"Zaawansowane opcje wyszukiwania", 
          "podpunkty": [
            {"kryterium":"Możliwość szukania z pomocą wielu filtrów"},
            {"kryterium":"Możliwość wyszukiwania za pomocą obrazów"},
            {"kryterium":"Wyniki wyszukiwania są czytelne, użyteczne i uszeregowane według trafności"},
            {"kryterium":"Wyszukiwanie pokrywa cały serwis, a nie tylko jego część"},
            {"kryterium":"Wyszukiwarka zapewnia opcję wyszukiwania stron podobnych"},
            {"kryterium":"Wyszukiwarka zapewnia automatyczne sprawdzania pisowni i szuka też w liczbie mnogiej i synonimach"},
            {"kryterium":"Zakres wyszukiwania jest wyraźnie pokazany na stronie z wynikami wyszukiwania i użytkownik może go zawęzić"},
            {"kryterium":"Możliwość sortowania wyników wyszukiwania"},
            {"kryterium":"Strona z wynikami wyszukiwania nie pokazuje duplikatów wyników"},
            {"kryterium":"Strona z wynikami nie pokazuje niedostępnych elementów (lub są one właściwie oznaczone)"},
            {"kryterium":"Strona zawiera rozbudowaną wersję wyszukiwarki umożliwiającą doprecyzowanie wyników wyszukiwania"},
            {"kryterium":"Wyszukiwarka obsługuje należycie puste zapytania"},
            {"kryterium":"Jeśli nie znaleziono wyników dla szukanego ciągu znaków, system proponuje pomysły lub opcje na podstawie najczęściej spotykanych problemów, które mogą poprawić zapytanie"},
            {"kryterium":"Strona z wynikami wyszukiwania pokazuje użytkownikowi, co było szukane i łatwo jest edytować i ponowić wyszukiwanie"},
            {"kryterium":"Wyszukiwanie jest odporne i wszystkie kluczowe funkcjonalności działają (np. nie ma wyjątków javascript, niedziałających linków)"}
          ]
        },
        {"nazwaPunktu":"Przemyślany proces zamawiania oraz finalizacji zamówienia", 
          "podpunkty": [
            {"kryterium":"Możliwość wybrania innych adresów dostawy i kupującego"},
            {"kryterium":"Możliwa opcja płatności przez Internet"},
            {"kryterium":"Możliwa opcja płatności przy odbiorze"},
            {"kryterium":"Możliwość wyboru rodzaju dostawy (kurier, odbiór osobisty)"},
            {"kryterium":"Możliwość wyboru preferowanego czasu dostawy"},
            {"kryterium":"Możliwość ozdobnego zapakowania zamówienia (bezpośrednio na prezent)"},
            {"kryterium":"Możliwość anulowania zamówienia"},
            {"kryterium":"Możliwość edytowania zamówienia"},
            {"kryterium":"Możliwość zamawiania bez rejestracji"},
            {"kryterium":"Możliwość śledzenia zamówienia"},
            {"kryterium":"Możliwość wyświetlenia podsumowania zamówienia"},
            {"kryterium":"Dostęp do historii zamówień (przechowywanie faktur na serwerze)"},
            {"kryterium":"Możliwość ocenienia zakupu"},
            {"kryterium":"Możliwość zamówienia na podstawie zamówienia z historii (powtórne zamówienie)"}
          ]
        },
        {"nazwaPunktu":"Funkcjonalny koszyk", 
          "podpunkty": [
            {"kryterium":"Możliwość dodawania do koszyka różnych produktów"},
            {"kryterium":"Możliwość zmiany ilość sztuk danego produktu w koszyku"},
            {"kryterium":"Możliwość zadania pytania o konkretny produkt z poziomu jego podstrony"},
            {"kryterium":"Możliwość usuwania produktów z koszyka"},
            {"kryterium":"Możliwość dodania pozycji na listę życzeń/obserwowanych"},
            {"kryterium":"Proponowane produkty zbliżone do obecnie wybranego"},
            {"kryterium":"Możliwość zapamiętania koszyka po wylogowaniu z serwisu"}
          ]
        },
        {"nazwaPunktu":"Zapewnione bezpieczeństwo danych użytkownika", 
          "podpunkty": [
            {"kryterium":"Możliwość uruchomienia weryfikacji dwuetapowej"},
            {"kryterium":"Strona posiada zainstalowany certyfikat SSL"},
            {"kryterium":"Strona nie posiada żadnych luk, takich jak np.: SQL injection"},
            {"kryterium":"Strona wymusza zweryfikowanie adresu email"},
            {"kryterium":"Strona wykrywa logowanie na nowym urządzeniu i informuje o tym użytkownika"},
            {"kryterium":"Strona oferuje szybkie przelewy internetowe od sprawdzonego dostawcy"},
            {"kryterium":"Strona wymusza używanie silnego hasła"}
          ]
        }
      ]
    },
    {"nazwaSzablonu":"forum",
      "punkty":[
        {"nazwaPunktu":"Zgodność ze standardami", 
          "podpunkty": [
            {"kryterium":"Strona korzysta z tzw. okruchów (ang. Breadcrumb)"},
            {"kryterium":"Aktywny odnośnik jest wyróżniony"},
            {"kryterium":"Dział do którego użytkownik nie ma dostępu jest niewidoczny bądź odpowiednio oznaczony"},
            {"kryterium":"Temat, w którym pojawia się nowa wiadomość jest odpowiednio oznaczony"},
            {"kryterium":"Logiczny rozdział treści na kategorie i podkategorie"},
            {"kryterium":"Rozbudowany edytor tekstowy z możliwością załączania plików multimedialnych do wysyłanych wiadomości"}
          ]
        },
        {"nazwaPunktu":"Sprawnie działająca wyszukiwarka", 
          "podpunkty": [
            {"kryterium":"Wyniki wyszukiwania są czytelne, użyteczne i uszeregowane według trafności"},
            {"kryterium":"Strona z wynikami wyszukiwania nie pokazuje duplikatów wyników"},
            {"kryterium":"Wyszukiwanie pokrywa całe forum, a nie tylko jego część"},
            {"kryterium":"Zakres wyszukiwania jest wyraźnie pokazany oraz można go zawęzić"},
            {"kryterium":"Forum zawiera rozbudowaną wersję wyszukiwarki umożliwiającą doprecyzowanie wyników wyszukiwania"},
            {"kryterium":"Wyszukiwarka obsługuje należycie puste zapytania"},
            {"kryterium":"Wyszukiwarka zapewnia automatyczne sprawdzania pisowni i szuka też w liczbie mnogiej i synonimach"},
            {"kryterium":"Wyszukiwanie jest odporne i wszystkie kluczowe funkcjonalności działają (np. nie ma wyjątków javascript, niedziałających linków)"}
          ]
        },
        {"nazwaPunktu":"Rozbudowane możliwości personalizowania interfejsu", 
          "podpunkty": [
            {"kryterium":"Możliwość zmiany kolejności elementów strony"},
            {"kryterium":"Możliwość ukrywania bądź minimalizowania elementów strony"},
            {"kryterium":"Możliwość zmiany kolorystyki bądź motywu graficznego forum"}
          ]
        },
        {"nazwaPunktu":"Funkcjonalne konto użytkownika", 
          "podpunkty": [
            {"kryterium":"Użytkownik może edytować swoje dane"},
            {"kryterium":"Użytkownik może usunąć swoje konto"},
            {"kryterium":"Użytkownik może dodawać innych użytkowników do listy znajomych"},
            {"kryterium":"Użytkownik może blokować  innych użytkowników"},
            {"kryterium":"Użytkownik może dodać takie elementy jak zdjęcie profilowe bądź podpis"},
            {"kryterium":"Użytkownik może oceniać posty innych (zmieniać reputację)"}
          ]
        }
      ]
    }
  ]}`;