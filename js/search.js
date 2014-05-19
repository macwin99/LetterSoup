function createSoup(){

    soup = new Array(document.getElementById("Number_Rows").value);
    for (i=0;i<document.getElementById("Number_Rows").value;i++){
        soup[i]= new Array(document.getElementById("Number_Colums").value);       
    }

}

function fillSoup(){
    for (i=0;i<document.getElementById("Number_Rows").value;i++){
        var letters = document.getElementById("letters" + i).value;
        var fragments = letters.split('');
        for (x=0;x<document.getElementById("Number_Colums").value;x++){
            soup[i][x]=fragments[x];
        }       
    }
}

function search_word(){
    fillSoup();
    var word_number = document.getElementsByName("word").length+1;
    for (i=1;i<word_number;i++){
            var word = document.getElementById("word" + i).value;
            var fragments = word.split('');
            search_pattern(fragments,fragments[0]);
    }
}

function search_pattern(fragments,fragment){
    var exist = false;
    var position;
    for (y=0;i<document.getElementById("Number_Rows").value;i++){
        for (x=0;i<document.getElementById("Number_Colums").value;i++){
            if( soup[y][x]== fragment){
                
                var complet = search_next_pattern(fragments,x,y,'none',1);
                if(complet){
                    exist=true;
                    position = "The Word is in "+y+1+" Row and "+x+1+" Column."
                }
            }
        }
    }
    if(exist){
        alert(position);
    }
    else{
        alert("The Word is not here!");
    }
    
}

function search_next_pattern(fragments,x,y,pattern,section){
    switch(pattern) {
        case 'col+':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x+1,y,'col+');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'col-':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x-1,y,'col-');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'row+':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x,y+1,'row+');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'row-':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x,y-1,'row-');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'row-col-':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x-1,y-1,'row-col-');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'row-col+':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x+1,y-1,'row-col+');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'row+col-':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x-1,y+1,'row+col-');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        case 'row+col+':
            if(section == fragments.length)
            {
                return true;
            }
            else
            {
                if(fragments[section] == soup[y][x])
                {
                    search_next_pattern(fragments,x+1,y+1,'row+col+');
                }
                else
                {
                    return false;
                }
                
            }
            
            break;
        default:
            if(fragments[1] == soup[x+1][y])
            {
                search_next_pattern(fragments,x+1,y,'col+');
            }
            else
            {
                if(fragments[1] == soup[x-1][y])
                {
                    search_next_pattern(fragments,x-1,y,'col-');
                }
                else
                {
                    if(fragments[1] == soup[x][y+1])
                    {
                        search_next_pattern(fragments,x,y+1,'row+');
                    }
                    else
                    {
                        if(fragments[1] == soup[x][y-1])
                        {
                            search_next_pattern(fragments,x,y-1,'row-');
                        }
                        else
                        {
                            if(fragments[1] == soup[x+1][y-1])
                            {
                                search_next_pattern(fragments,x+1,y-1,'row-col+');
                            }
                            else
                            {
                                if(fragments[1] == soup[x+1][y+1])
                                {
                                    search_next_pattern(fragments,x+1,y+1,'row+col+');
                                }
                                else
                                {
                                    if(fragments[1] == soup[x-1][y+1])
                                    {
                                        search_next_pattern(fragments,x-1,y+1,'row+col-');
                                    }
                                    else
                                    {
                                        search_next_pattern(fragments,x-1,y-1,'row-col-');
                                    }
                                }
                            }
                        }
                    }
                }
            }
            break;
    }
}