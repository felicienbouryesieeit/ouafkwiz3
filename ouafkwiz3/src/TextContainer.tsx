import textFR from './textFR.json'
import textEN from './textEN.json'
import itemsEN from './itemsEN.json'
import itemsFR from './itemsFR.json'

class TextContainer {


    export_text(index_language : number,index_array : number, index_element : number) {
        
        let test = textEN;
        switch (index_language) {
            case 0 : 
            test = textEN;
            
            break;

            case 1 :
            test = textFR;
            break;
        }
        

        
        
        let test2 = test[index_array][index_element]
        return test2
    }

    export_item(index_language : number,index_array : number, index_element : number) {
        let test = itemsEN;
        switch (index_language) {
            case 0 : 
            test = itemsEN;
            break;

            case 1 :
            test = itemsFR;
            break;
        }
        let test2 ='';
        switch (index_element) {
            case 0 : 
            test2 = test[index_array].n
            break;

            case 1 : 
            test2 = test[index_array].d
            break;
        }
        return test2;
    }
}

export default TextContainer;