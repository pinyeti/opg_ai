function createQueryDialog(){

    //---------- tabs normes
     
    $( function() {
        $('#tabsQuery').tabs({
            activate: function (event,ui) {
            //
            }
        })
    });

    htmlRevision=`
            <BR>
            ${strSelectTABLE_RPG}
            <BR><BR>          
            ${divOptionsQUERY_RPG}
            <BR><BR> 
            ${divQUERY_RPG}
            <BR>   
           `;
    
    htmlVigente=`
           <BR>
           ${strSelectTABLE}
           <BR><BR>          
           ${divOptionsQUERY}
           <BR><BR> 
           ${divQUERY}
           <BR>   
          `;

    var htmlTabsQuery=`<div  style='overflow: auto;margin-top: 0px;margin-bottom: 0px; height:98%;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;font-size:7.8pt' id="tabsQuery">
            <ul>
                <li title="Consultes Revisió Pla General"><a href="#tabQueryRevision">PLA GENERAL (APROVACIÓ INICIAL)</a></li>
               <!-- <li title="Consultes Pla Vigent"><a href="#tabQueryVigente">VIGENT</a></li> -->
              
            </ul>

            <div  style='overflow: auto;padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px' id="tabQueryRevision"> 
                ${htmlRevision}
            </div>
           <!-- <div  style='overflow: auto;padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px' id="tabQueryVigente">
                ${htmlVigente}
            </div>  --> 
             
            </div>
        `;

      

        var elem = document.getElementById('queryTables');        
        elem.innerHTML= `<div style='overflow:auto;padding:20px;background-color:#f2f2f2;border-style: solid;border-width:0pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:90%;top:10px;left:10px'>  
            ${htmlTabsQuery}
            </DIV>`;  

}