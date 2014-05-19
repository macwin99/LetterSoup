function createSoup()
{
    soup = new Array(document.getElementById("Number_Rows").value);
    for (i=0;i<document.getElementById("Number_Rows").value;i++)
    {
        soup[i]= new Array(document.getElementById("Number_Colums").value);       
    }
}

function fillSoup()
{
    for (i=0;i<document.getElementById("Number_Rows").value;i++)
    {
        var row = table.insertRow(i);
        var letters = document.getElementById("letters" + i).value;
        var fragments = letters.split('');
        for (x=0;x<document.getElementById("Number_Colums").value;x++)
        {
            var cell1 = row.insertCell(x);
            cell1.innerHTML = fragments[x];
            soup[i][x]=fragments[x];
        }      
    }
}

function search_word()
{
    var word_number = document.getElementsByName("word").length;
    if(word_number>0)
    {
        fillSoup();
        for (i=1;i<=word_number;i++)
        {
            var word = document.getElementById("word" + i).value;
            var fragments = word.split('');
            search_pattern(fragments,fragments[0],word);
        }
    }
    else
    {
        alert("You need to specifie wich Word are you looking for");
    }
}

function search_pattern(fragments,fragment,word)
{
    var exist = false;
    for (var y=0;y<document.getElementById("Number_Rows").value;y++)
    {
        for (var x=0;x<document.getElementById("Number_Colums").value;x++)
        {
            if( soup[y][x]===fragment)
            {
                if(fragments.length>1)
                {
                    var complet = analise_first_pattern(fragments,x,y,1);
                    if(complet)
                    {
                        exist=true;
                        position = "The Word "+word+" is in "+y+" Row and "+x+" Column."
                    }
                }
                else
                {
                    exist=true;
                    alert("The Word "+word+" is in "+y+" Row and "+x+" Column.");
                }
            }
        }
    }
    if(exist)
    {
        alert(position);
    }
    else
    {
        alert("The Word is not in the Soup!");
    }
}

function analise_first_pattern(fragments,x,y,section)
{
    var limite = fragments.length-1;
    var find = false;
    if(x==0&&y==0)//Primera Esquina
    {
        //No puede hacer -row, -col, -row.-col,+row.-col,-row.+col
        for(var i=0; i<3;i++)
        {
            switch(i)
            {
                case 0:
                    find = search_next_pattern(fragments,x+1,y,'row+',section);
                    break
                case 1:
                    find = search_next_pattern(fragments,x,y+1,'col+',section);
                    break
                case 2:
                    find = search_next_pattern(fragments,x+1,y+1,'row+col+',section);
                    break
            } 
            if(find)
            {
                i=3;
            }
        }
        return find;
    }
    else
    {
        if(x===0&&y===limite)//Segunda Esquina
        {
            //No puede hacer -row, +col, +row.+col,-row.+col,-row.-col
            for(var i=0; i<3;i++)
            {
                switch(i)
                {
                    case 0:
                        find = search_next_pattern(fragments,x-1,y,'row-',section);
                        break
                    case 1:
                        find = search_next_pattern(fragments,x,y+1,'col+',section);
                        break
                    case 2:
                        find = search_next_pattern(fragments,x-1,y+1,'row+col-',section);
                        break
                }
                if(find)
                {
                    i=3;
                }

            }
            return find;
        }
        else
        {
            if(x===limite&&y===0)//Tercera Esquina
            {
                //No puede hacer +row, -col, +row.-col,+row.+col,-row.-col
                for(var i=0; i<3;i++)
                {
                    switch(i)
                    {
                        case 0:
                            find = search_next_pattern(fragments,x-1,y,'row-',section);
                            break
                        case 1:
                            find = search_next_pattern(fragments,x,y+1,'col+',section);
                            break
                        case 2:
                            find = search_next_pattern(fragments,x-1,y+1,'row-col+',section);
                            break
                    }
                    if(find)
                    {
                        i=3;
                    }
                }
                return find;
            }
            else
            {
                if(x===limite&&y===limite)//Ultima Esquina
                {
                    //No puede hacer +row, +col, +row.-col,+row.+col,-row.+col
                    for(var i=0; i<3;i++)
                    {
                        switch(i)
                        {
                            case 0:
                                find = search_next_pattern(fragments,x-1,y,'row-',section);
                                break
                            case 1:
                                find = search_next_pattern(fragments,x,y-1,'col-',section);
                                break
                            case 2:
                                find = search_next_pattern(fragments,x-1,y-1,'row-col-',section);
                                break
                        } 
                        if(find)
                        {
                            i=3;
                        }
                    }
                    return find;
                }
                else
                {
                    if(x===0)//Todo menos esquinas
                    {
                        for(var i=0; i<5;i++)
                        {
                            switch(i)
                            {
                                case 0:
                                    find = search_next_pattern(fragments,x+1,y,'row+',section);
                                    break
                                case 1:
                                    find = search_next_pattern(fragments,x,y-1,'col-',section);
                                    break
                                case 2:
                                    find = search_next_pattern(fragments,x,y+1,'col+',section);
                                    break
                                case 3:
                                    find = search_next_pattern(fragments,x+1,y+1,'row+col+',section);
                                    break
                                case 4:
                                    find = search_next_pattern(fragments,x+1,y-1,'row+col-',section);
                                    break
                            } 
                            if(find)
                            {
                                i=5;
                            }
                        }
                        return find;
                    }
                    else
                    {
                        if(y===0)//Todo menos esquinas
                        {
                            for(var i=0; i<5;i++)
                            {
                                switch(i)
                                {
                                    case 0:
                                        find = search_next_pattern(fragments,x+1,y,'row+',section);
                                        break
                                    case 1:
                                        find = search_next_pattern(fragments,x,y+1,'col+',section);
                                        break
                                    case 2:
                                        find = search_next_pattern(fragments,x-1,y,'row-',section);
                                        break
                                    case 3:
                                        find = search_next_pattern(fragments,x+1,y+1,'row+col+',section);
                                        break
                                    case 4:
                                        find = search_next_pattern(fragments,x-1,y+1,'row-col+',section);
                                        break
                                }
                                if(find)
                                {
                                    i=5;
                                }
                            }
                            return find;
                        }
                        else
                        {
                            if(x===limite)
                            {
                                for(var i=0; i<5;i++)
                                {
                                    switch(i)
                                    {
                                        case 0:
                                            find = search_next_pattern(fragments,x,y+1,'col+',section);
                                            break
                                        case 1:
                                            find = search_next_pattern(fragments,x,y-1,'col-',section);
                                            break
                                        case 2:
                                            find = search_next_pattern(fragments,x-1,y,'row-',section);
                                            break
                                        case 3:
                                            find = search_next_pattern(fragments,x-1,y+1,'row-col+',section);
                                            break
                                        case 4:
                                            find = search_next_pattern(fragments,x-1,y-1,'row-col-',section);
                                            break
                                    }
                                    if(find)
                                    {
                                        i=5;
                                    }
                                }
                                return find;
                            }
                            else
                            {
                                if(y===limite)
                                {
                                    for(var i=0; i<5;i++)
                                    {
                                        switch(i)
                                        {
                                            case 0:
                                                find = search_next_pattern(fragments,x+1,y,'row+',section);
                                                break
                                            case 1:
                                                find = search_next_pattern(fragments,x,y-1,'col-',section);
                                                break
                                            case 2:
                                                find = search_next_pattern(fragments,x-1,y,'row-',section);
                                                break
                                            case 3:
                                                find = search_next_pattern(fragments,x+1,y-1,'row+col-',section);
                                                break
                                            case 4:
                                                find = search_next_pattern(fragments,x-1,y-1,'row-col-',section);
                                                break
                                        }
                                        if(find)
                                        {
                                            i=4;
                                        }
                                    }
                                    return find;
                                }
                                else
                                {
                                    for(var i=0; i<8;i++)
                                    {
                                        switch(i)
                                        {
                                            case 0:
                                                find = search_next_pattern(fragments,x+1,y,'row+',section);
                                                break
                                            case 1:
                                                find = search_next_pattern(fragments,x,y-1,'col-',section);
                                                break
                                            case 2:
                                                find = search_next_pattern(fragments,x-1,y,'row-',section);
                                                break
                                            case 3:
                                                find = search_next_pattern(fragments,x+1,y-1,'row+col-',section);
                                                break
                                            case 4:
                                                find = search_next_pattern(fragments,x-1,y-1,'row-col-',section);
                                                break
                                            case 5:
                                                find = search_next_pattern(fragments,x+1,y+1,'row+col+',section);
                                                break
                                            case 6:
                                                find = search_next_pattern(fragments,x,y+1,'col+',section);
                                                break
                                            case 7:
                                                find = search_next_pattern(fragments,x-1,y+1,'row-col+',section);
                                                break
                                        }
                                        if(find)
                                        {
                                            i=7;
                                        }
                                            
                                    }
                                    return find;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function search_next_pattern(fragments,x,y,pattern,section)
{
    if((x>=fragments.length && section!=fragments.length)||(y>=fragments.length && section!=fragments.length)||(x<0 && section!=fragments.length)||(y<0 && section!=fragments.length)||section>fragments.length)
    {
        return false;
    }
    else
    {
        switch(pattern) 
        {
            case 'col+':
                if(section == fragments.length)
                {
                    return true;
                }
                else
                {
                    if(fragments[section] == soup[y][x])
                    {
                        return search_next_pattern(fragments,x+1,y,'col+',section+1);
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
                        return search_next_pattern(fragments,x-1,y,'col-',section+1);
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
                        return search_next_pattern(fragments,x,y+1,'row+',section+1);
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
                        return search_next_pattern(fragments,x,y-1,'row-',section+1);
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
                        return search_next_pattern(fragments,x-1,y-1,'row-col-',section+1);
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
                        return search_next_pattern(fragments,x+1,y-1,'row-col+',section+1);
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
                        return search_next_pattern(fragments,x-1,y+1,'row+col-',section+1);
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
                        return search_next_pattern(fragments,x+1,y+1,'row+col+',section+1);
                    }
                    else
                    {
                        return false;
                    }    
                }
                break;
            default:
                search_pattern_first(fragments,x,y,section);
                break;
        }
    }
}