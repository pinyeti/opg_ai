function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}

async function contentQueryRPG(){

    /* $( function() {
        $( "#selectTables" ).selectable();
     
        
      } ); */

    divQUERY_RPG=`<div id="divQUERY_RPG" style='background-color:#f2f2f2;width:100%;height:60%'></div`;

    divOptionsQUERY_RPG=`<div id="divOptionsQUERY_RPG" style='background-color:#f2f2f2;width:100%'></div`;

    // <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNADA">-</option>
    strOptionsTables=`
            <option value="NADA" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optNADA">-</option>    
            <optgroup label="Zones ordinaries del Sòl Urbà" style='background-color:white;font-size:7.5pt.5pt;font-family:Arial Black;color:black'>
                <option value="RSD" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optRES">(RSD) Zona Ús Residencial</option>            
                <option value="IND" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optRES">(IND) Zona Ús Industrial</option>            
                <option value="TER" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optRES">(TER) Zona Ús Terciari</option>            
                <option value="TUR" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optRES">(TUR) Zona Ús Túristic</option>                          
            </optgroup>   
            <optgroup label="Sistemes" style='background-color:white;font-size:7.5pt.5pt;font-family:Arial Black;color:black'>
                <option value="SLEQ" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSLEQ">(SLEQ) Equipaments Comunitaris (S.Local)</option>            
                <option value="SLEL" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSLEL">(SLEL) Espais Lliures Publics (S.Local)</option>            
                <option value="SLC" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSLC">(SLC) Comunicacions (S.Local)</option>               
                <option value="SLIF" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSLIF">(SLIF) Infraestructures (S.Local)</option>            
                <option value="SLSU" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSLSU">(SLSU) Serveis Urbans (S.Local)</option>            
                <option value="SGEC" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGEC">(SGEC) Equipaments Comunitaris (S.General)</option>            
                <option value="SGEL" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGEL">(SGEL) Espais Lliures (S.General)</option>                          
                <option value="SGC" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGC">(SGC) Comunicacions (S.General)</option>                          
                <option value="SGIF" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGIF">(SGIF) Infraestructures (S.General)</option>                          
                <option value="SGSU" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGSU">(SGSU) Serveis Urbans (S.General)</option>                                
            </optgroup>    
            <optgroup label="Protecció i Preservació" style='background-color:white;font-size:7.5pt.5pt;font-family:Arial Black;color:black'>
                <option value="CAT" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optCAT">(CAT) Catalegs</option>   
              <!--  <option value="CAT_MOL" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optCAT_M">(CAT_MOL) Catalegs Molins</option>   -->                  
                <option value="CH" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optCH">(CH) Zones Centre Historic (N/R)</option>   
                <option value="r" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optPV">(r) Preservació arquitectònica ambiental</option>                     
            </optgroup>           
            <optgroup label="(SRP) Sòl Rustic Protegit" style='background-color:white;font-size:7.5pt.5pt;font-family:Arial Black;color:black'>
                <option value="AANP" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optAANP">(AANP) Àrees naturals d'especial interès d'alt nivell de protecció</option>            
                <option value="ANEI" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optANEI">(ANEI) Àrees naturals d'especial interès</option> 
                <option value="AIN" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optAIN-PG">(AIN) Àrees d'interès Natural per planejament general</option> 
                <option value="ARIP" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optARIP">(ARIP) Àrees Rurals d'interès paisatgístic</option>    
                <option value="ZIP" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optZIP">(ZIP) Zones d'Interès Paisatgístic protegida per planejament general.</option>
               <!-- <option value="APR" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optAPR">(APR) Àrees de prevenció de riscos.</option>
                <option value="APT" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optAPT-C">(APT) Àrees de protecció territorial</option>   -->                      
            </optgroup>    
            <optgroup label="(SRC) Sòl Rústic Comú" style='background-color:white;font-size:7.5pt.5pt;font-family:Arial Black;color:black'>
                <option value="AIA" style='font-size:7.5pt.5pt;font-family:Arial;Arial;background-color:white;color:black' id="optAIA">(AIA) Àrees d'interès agrari.</option>
                <option value="AT-H" style='font-size:7.5pt.5pt;font-family:Arial;Arial;background-color:white;color:black' id="optAT-H">(AT-H) Àrees de transició, d'harmonització.</option> 
                <option value="SRG" style='font-size:7.5pt.5pt;font-family:Arial;Arial;background-color:white;color:black' id="optSRG">(SRG) Àrees de sòl rústic de règim general.</option>  
            </optgroup>
            <option value="NR" style='font-size:7.5pt.5pt;font-family:Arial Black;Arial;background-color:white;color:black' id="optNR">(NR) Sòl Rústic categoria de Nucli Rural</option> 
            <option value="SUB" style='font-size:7.5pt.5pt;font-family:Arial Black;Arial;background-color:white;color:black' id="optSUB">(SUB) Sòl Urbanitzable</option>   
           <!-- <optgroup label="(SU) Sòl Urbà" style='font-size:7.5pt.5pt;font-family:Arial Black;background-color:white;color:black'>
                <option value="ZOU" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optZOU">(ZOU) Zona ordenació Urbanística</option> 
                <option value="API" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optAPI">(API) Àmbits de Planejament Incorporat</option>
                <option value="ATU" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optAPI">Actuacions de Transformació Urbanistica</option>            
            </optgroup>   
            <optgroup label="(SG) Sistemes Genertal en Sòl Rustic" style='font-size:7.5pt.5pt;font-family:Arial Black;Arial;background-color:white;color:black'>
                <option value="SGEC" style='font-size:7.5pt.5pt;font-family:Arial;Arial;background-color:white;color:black' id="optSGEC">Sistemes Generals d'Equipaments</option> 
                <option value="SGSI" style='font-size:7.5pt.5pt;font-family:Arial;Arial;background-color:white;color:black' id="optSGSI">Sistemes Generals de serveis urbans i d'infraestructures</option>
                <option value="SGCT" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGCT">Sistemes Generals de Comunicacions i Transports </option>  
                <option value="SGEL" style='font-size:7.5pt.5pt;font-family:Arial;background-color:white;color:black' id="optSGEL">Sistemes Generals d'espais lliures</option> 
            </optgroup>     -->                   

        `;

        // <option value="SGSE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSGSE">Altres instal·lacions d'interès social i d'activitats econòmiques d'interès general</option>            

      /*  $( function() {
            $( "#selectTables" ).selectmenu( { style: "dropdown", width:400,height:200 })
                     
        } ); */
 
     strSelectTABLE_RPG=`
           
                <select onchange='setOptionsQUERY_RPG()' style='background-color:#5b9ec1;color:white;padding:2px;font-size:9pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectTablesRPG" id="selectTablesRPG" >
               
                    ${strOptionsTables}
                </select>
            `; 
   /*     var strSelectTABLE=`<select onchange='setOptionsQUERY_RPG()' style='overflow:scroll' name="selectTables" id="selectTables" >
                  ${strOptionsTables}
                  </select>`;*/
   
    

    
      // Diseño QUERY DIALOG
    html="";
    html=html+`<div style='overflow: auto;padding:20px;background-color:#f2f2f2;border-style: solid;border-width:0pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:90%;top:10px;left:10px'>
                <LABEL style='padding:5px;font-size:8.5pt;font-family:Arial Black;background-color:#fdfde0;color:#1a4d1a;box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);border-style: solid;border-width:0.1pt;border-color:black;width:380px;height:20px;'>CONSULTES REVISIÓ PLA GENERAL</LABEL><BR><BR>   
                
                ${strSelectTABLE_RPG}
                <BR><BR>
                
                ${divOptionsQUERY_RPG}
               <BR><BR> 
                ${divQUERY_RPG}
                
               
                <BR>   
                </div>`;


    //var elem = document.getElementById('queryTables');   
    // elem.innerHTML=html;  
   
    setOptionsQUERY_RPG();

            

}

async function setOptionsQUERY_RPG(){

    var elem = document.getElementById('selectTablesRPG'); 
    var tipo=elem.value; 
    
    if(tipo=="CAT"){

        var strOptionsPROT_CAT=`
        <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_P_CAT">TOTS</option>
        <option value="A1" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_A1">(A1) Nivell de Protecció Integral Grau 1</option>
        <option value="A2" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_A2">(A2) Nivell de Protecció Integral Grau 2</option>
        <option value="B" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_B">(B) Nivell de Protecció Parcial (estructural) </option>
        <option value="C" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_C">(C) Nivell de Protecció Ambiental </option>
       
        `;

        var strSelectPROT_CAT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectPROT_CAT" id="selectPROT_CAT" >
            ${strOptionsPROT_CAT}
            </select>`;

        html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>NIVELL PROTECCIÓ</label></td>
                    <td>${strSelectPROT_CAT}</td>      
                </tr>   
               
             
            </TABLE>`;

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="CAT_MOL"){

        var strOptionsPROT_CAT=`
        <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_P_CAT">TOTS</option>
        <option value="A1" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_A1">(A1) Nivell de Protecció Integral Grau 1</option>
        <option value="A2" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_A2">(A2) Nivell de Protecció Integral Grau 2</option>
        <option value="B" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_B">(B) Nivell de Protecció Parcial (estructural) </option>
        <option value="C" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCAT_C">(C) Nivell de Protecció Ambiental </option>
       
        `;

        var strSelectPROT_CAT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectPROT_CAT" id="selectPROT_CAT" >
            ${strOptionsPROT_CAT}
            </select>`;

        html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>NIVELL PROTECCIÓ</label></td>
                    <td>${strSelectPROT_CAT}</td>      
                </tr>   
               
             
            </TABLE>`;

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }


    if(tipo=="CH"){

        var strOptionsCH=`
        <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_CH">TOTS</option>
        <option value="R" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optR">(R) Preservació arquitectònica ambiental</option>
        <option value="N" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optN">(N) Preservació ambiental</option>
         
        `;

        var strSelectCH=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectCH" id="selectCH" >
            ${strOptionsCH}
            </select>`;

        html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA PRESERVACIÓ</label></td>
                    <td>${strSelectCH}</td>      
                </tr>   
               
             
            </TABLE>`;

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="r"){

    

        html=``;

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }


    if(tipo=="RSD"){

        var strOptionsUSO_PRED=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_UP">TOTS</option>
            <option value="Residencial plurifamiliar" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPLU">Residencial Plurifamiliar</option>
            <option value="Residencial unifamiliar" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optUNI">Residencial Unifamiliar</option>
            `;
        var strOptionsSIST_ORD=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SO">TOTS</option>
            <option value="AV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV">Alineació Vial</option>
            <option value="RP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRP">Regulació Pracel.la</option>
            <option value="VE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optVE">Volumetria Especifica</option>
          
            `;
        var strOptionsTIPO_EDIF=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_TE">TOTS</option>
            <option value="AV-MC.R." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV_MC_R">AV-MC.R.</option>
            <option value="AV-MC.V." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV_MC_V">AV-MC.V.</option>
            <option value="RP.S." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRP_S">RP.S.</option>
            <option value="RP.A." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV_MC_V">RP.A.</option>
            <option value="VE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optV_E">VE</option>
         
            `;

        var strOptionsZONA_RSD=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SO">TOTS</option>
            <option value="A" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_A">(A) Residencial Plurifamiliar Eixample</option>
            <option value="B" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_B">(B) Residencial Plurifamiliar Eixample Perifèric</option>
            <option value="C" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_C">(C) Residencial Plurifamiliar Eixos Cívics</option>
            <option value="D" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_D">(D) Residencial Plurifamiliar en illa tancada reculada</option>
            <option value="D-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_D_Pl">(D-Pl) Edificació Residencial entre mitgeres en Platja Palma</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_E">(E) Residencial Plurifamiliar Ordenació Oberta</option>
            <option value="E-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_E_Pl">(E-Pl) Habitatge Plurifamiliar aillat en Platja Palma</option>
            <option value="F" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_F">(F) Ordenació Volumètrica especifíca (Plurifamiliar/Terciari)</option>
            <option value="G" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_G">(G) Residencial Plurifamiliar amb tipologies mixtes</option>
            <option value="H" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_H">(H) Residencial Plurifamiliar MC reculada amb porxos</option>
            <option value="I" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_I">(I) Residencial Unifamiliar aillada de baixa densitat</option>
            <option value="I-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_I_Pl">(I-Pl) Habitatge Unifamiliar en Platja Palma</option>      
            <option value="J" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_J">(J) Residencial Unifamiliar suburbana</option>
            <option value="K" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_K">(K) Residencial Unifamiliar entre mitgeres</option>
            <option value="VT-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_VT_Pl">(VT-Pl) Habitatge tradicional en Platja Palma</option>
            <option value="VA-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRSD_VA_Pl">(VA-Pl) Habitatge Unifamiliar Adossat en Platja Palma</option>
          
            `;

        var strSelectUSO_PRED=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectUSO_PRED" id="selectUSO_PRED" >
            ${strOptionsUSO_PRED}
            </select>`;
        var strSelectSIST_ORD=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectSIST_ORD" id="selectSIST_ORD" >
            ${strOptionsSIST_ORD}
            </select>`;
        var strSelectTIPO_EDIF=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectTIPO_EDIF" id="selectTIPO_EDIF" >
            ${strOptionsTIPO_EDIF}
            </select>`;
        var strSelectZONA_RSD=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectZONA_RSD" id="selectZONA_RSD" >
            ${strOptionsZONA_RSD}
            </select>`;

        html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ÚS PREDOMINANT</label></td>
                    <td>${strSelectUSO_PRED}</td>      
                </tr>   
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SISTEMA ORDENACIÓ</label></td>
                    <td>${strSelectSIST_ORD}</td>      
                </tr>   
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPUS EDIFICACIÓ</label></td>
                    <td>${strSelectTIPO_EDIF}</td>      
                </tr>  
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                    <td>${strSelectZONA_RSD}</td>      
                </tr>    
                
             
            </TABLE>`;
    

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="IND"){

        var strOptionsZONA_IND=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_IND">TOTS</option>
            <option value="L" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optIND_L">(L) Industrial. Ús productiu en trama residencial</option>
            <option value="M" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optIND_M">(M) Industrial. Ús productiu en polígons Industrials</option> 
            `;

        var strSelectZONA_IND=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectZONA_IND" id="selectZONA_IND" >
            ${strOptionsZONA_IND}
            </select>`;

            html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                    <td>${strSelectZONA_IND}</td>      
                </tr>        
             
            </TABLE>`;

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="TER"){

      
        var strOptionsSIST_ORD=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SO">TOTS</option>
            <option value="AV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV">Alineació Vial</option>
            <option value="RP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRP">Regulació Pracel.la</option>
            <option value="VE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optVE">Volumetria Especifica</option>
          
            `;
        var strOptionsTIPO_EDIF=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_TE">TOTS</option>
            <option value="AV-MC.R." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV_MC_R">AV-MC.R.</option>
            <option value="AV-MC.V." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV_MC_V">AV-MC.V.</option>
            <option value="RP.S." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRP_S">RP.S.</option>
            <option value="RP.A." style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV_MC_V">RP.A.</option>
            <option value="VE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optV_E">VE</option>
         
            `;

        var strOptionsZONA_TER=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_TER_Z">TOTS</option>
            <option value="S" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTER_S">(S) Terciari en edificació aillada (Comercial/Administratiu)</option>
            <option value="S-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTER_S_Pl">(S-Pl) Comercial i Serveis en Platja Palma</option>
            <option value="F" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTER_F">(F) Ordenació Volumètrica especifíca (Plurifamiliar/Terciari)</option>
             
            `;

        var strSelectSIST_ORD=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectSIST_ORD" id="selectSIST_ORD" >
            ${strOptionsSIST_ORD}
            </select>`;
        var strSelectTIPO_EDIF=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectTIPO_EDIF" id="selectTIPO_EDIF" >
            ${strOptionsTIPO_EDIF}
            </select>`;
        var strSelectZONA_TER=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectZONA_TER" id="selectZONA_TER" >
            ${strOptionsZONA_TER}
            </select>`;

        html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SISTEMA ORDENACIÓ</label></td>
                    <td>${strSelectSIST_ORD}</td>      
                </tr>   
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPUS EDIFICACIÓ</label></td>
                    <td>${strSelectTIPO_EDIF}</td>      
                </tr>  
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                    <td>${strSelectZONA_TER}</td>      
                </tr>    
                
             
            </TABLE>`;
    

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="TUR"){
   

        var strOptionsZONA_TUR=`
        <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ZT">TOTS</option>
        <option value="T" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTUR_T">(T) Túristic en edificació aillada</option>
        <option value="T-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTUR_T_Pl">(T-Pl) Túristic en Platja Palma</option>
        <option value="TH-Pl" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTUR_TH-Pl">(TH-Pl)) Túristic hoteler en Platja Palma</option>
      
        `;

        var strSelectZONA_TUR=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectZONA_TUR" id="selectZONA_TUR" >
        ${strOptionsZONA_TUR}
        </select>`;

        html=`
            <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
            
                <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                    <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                    <td>${strSelectZONA_TUR}</td>      
                </tr>    
                
             
            </TABLE>`;

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }


    if(tipo=="SLEQ"){

        console.log("pasa inicio option quer SLEQ")

        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

        var strOptionsDOMINIO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_DM">TOTS</option>
            <option value="PB" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPBL">PÚBLIC</option>
            <option value="PV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPRV">PRIVAT</option>
         `; 

     
        var strOptionsDOTACIONAL=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
      
        let info_dotacional= await readDataFeatureRPG("usodot_eq_visor","fid>0");
        for(var n=0;n<info_dotacional.features.length;n++)
            strOptionsDOTACIONAL=strOptionsDOTACIONAL+`<option value="${info_dotacional.features[n].properties.uso}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_dotacional.features[n].properties.uso}">${info_dotacional.features[n].properties.descripcion_uso}</option>`;
      
        var strOptionsORD=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
       
        let info_ordenacion= await readDataFeatureRPG("calific_eq_visor","fid>0");
      
        for(var n=0;n<info_ordenacion.features.length;n++)
            strOptionsORD=strOptionsORD+`<option value="${info_ordenacion.features[n].properties.codigo}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_ordenacion.features[n].properties.codigo}">${info_ordenacion.features[n].properties.codigo}</option>`;
        
        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;
        var strSelectDOMINIO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOM" >
                  ${strOptionsDOMINIO}
                  </select>`;
        var strSelectDOTACIONAL=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOT" >
                  ${strOptionsDOTACIONAL}
                  </select>`;
        var strSelectORD=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectORD" id="selectORD" >
                  ${strOptionsORD}
                  </select>`;

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>DOMINI</label></td>
                <td>${ strSelectDOMINIO}</td>         
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ÚS DOTACIONAL</label></td>
                <td>${strSelectDOTACIONAL}</td>
           
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ORDENACIÓ</label></td>
                <td>${strSelectORD}</td>
           
            </tr> 
         
        </TABLE>`;

        console.log("pasa final option quer SLEQ")

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SLEL"){


        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

         var strOptionsORD=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>
            <option value="EL1a" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEL1a">EL1a</option>
            <option value="EL1b" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEL1b">EL1b</option>
            <option value="EL1c" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEL1c">EL1c</option>
            <option value="EL1d" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEL1d">EL1d</option>
         `; 
        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;
        var strSelectORD=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectORD" id="selectORD" >
                  ${strOptionsORD}
                  </select>`;

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ORDENACIÓ</label></td>
                <td>${strSelectORD}</td>
           
            </tr> 
         
        </TABLE>`;


        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SLC"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="SLIF"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="SLSU"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="SGEC"){


        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

        var strOptionsDOMINIO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_DM">TOTS</option>
            <option value="PB" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPBL">PÚBLIC</option>
            <option value="PV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPRV">PRIVAT</option>
         `; 

     
        var strOptionsDOTACIONAL=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
      
        let info_dotacional= await readDataFeatureRPG("usodot_eq_visor","fid>0");
        for(var n=0;n<info_dotacional.features.length;n++)
            strOptionsDOTACIONAL=strOptionsDOTACIONAL+`<option value="${info_dotacional.features[n].properties.uso}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_dotacional.features[n].properties.uso}">${info_dotacional.features[n].properties.descripcion_uso}</option>`;
      
        var strOptionsORD=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
        console.log("paix califiic0")
        let info_ordenacion= await readDataFeatureRPG("calificacion_sgeq_visor","fid>0");
        console.log("paix califiic1")
        for(var n=0;n<info_ordenacion.features.length;n++)
            strOptionsORD=strOptionsORD+`<option value="${info_ordenacion.features[n].properties.codigo}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_ordenacion.features[n].properties.codigo}">${info_ordenacion.features[n].properties.codigo}</option>`;
        
        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;
        var strSelectDOMINIO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOM" >
                  ${strOptionsDOMINIO}
                  </select>`;
        var strSelectDOTACIONAL=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOT" >
                  ${strOptionsDOTACIONAL}
                  </select>`;
        var strSelectORD=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectORD" id="selectORD" >
                  ${strOptionsORD}
                  </select>`;

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>DOMINI</label></td>
                <td>${ strSelectDOMINIO}</td>         
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ÚS DOTACIONAL</label></td>
                <td>${strSelectDOTACIONAL}</td>
           
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ORDENACIÓ</label></td>
                <td>${strSelectORD}</td>
           
            </tr> 
         
        </TABLE>`;

        console.log("pasa final option quer SLEQ")

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SGEL"){

        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
         
        </TABLE>`;

        console.log("pasa final option quer SLEQ")

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SGC"){


        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

        var strOptionsDOMINIO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_DM">TOTS</option>
            <option value="PB" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPBL">PÚBLIC</option>
            <option value="PV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPRV">PRIVAT</option>
         `; 

     
        var strOptionsDOTACIONAL=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
      
        let info_dotacional= await readDataFeatureRPG("usodot_sgc_visor","fid>0");
        for(var n=0;n<info_dotacional.features.length;n++)
            strOptionsDOTACIONAL=strOptionsDOTACIONAL+`<option value="${info_dotacional.features[n].properties.uso}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_dotacional.features[n].properties.uso}">${info_dotacional.features[n].properties.descripcion_uso}</option>`;
         
        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;
        var strSelectDOMINIO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOM" >
                  ${strOptionsDOMINIO}
                  </select>`;
        var strSelectDOTACIONAL=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOT" >
                  ${strOptionsDOTACIONAL}
                  </select>`;
       
        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>DOMINI</label></td>
                <td>${ strSelectDOMINIO}</td>         
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ÚS DOTACIONAL</label></td>
                <td>${strSelectDOTACIONAL}</td>
           
            </tr> 
              
        </TABLE>`;

        console.log("pasa final option quer SLEQ")

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SGIF"){


        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

        var strOptionsDOMINIO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_DM">TOTS</option>
            <option value="PB" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPBL">PÚBLIC</option>
            <option value="PV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPRV">PRIVAT</option>
         `; 

     
        var strOptionsDOTACIONAL=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
      
        let info_dotacional= await readDataFeatureRPG("usodot_sgif_visor","fid>0");
        for(var n=0;n<info_dotacional.features.length;n++)
            strOptionsDOTACIONAL=strOptionsDOTACIONAL+`<option value="${info_dotacional.features[n].properties.uso}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_dotacional.features[n].properties.uso}">${info_dotacional.features[n].properties.descripcion_uso}</option>`;
         
        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;
        var strSelectDOMINIO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOM" >
                  ${strOptionsDOMINIO}
                  </select>`;
        var strSelectDOTACIONAL=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOT" >
                  ${strOptionsDOTACIONAL}
                  </select>`;
       
        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>DOMINI</label></td>
                <td>${ strSelectDOMINIO}</td>         
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ÚS DOTACIONAL</label></td>
                <td>${strSelectDOTACIONAL}</td>
           
            </tr> 
              
        </TABLE>`;

        console.log("pasa final option quer SLEQ")

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SGSU"){


        var strOptionsEP=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_EP">TOTS</option>
            <option value="E" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optE">EXISTENT</option>
            <option value="P" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optP">PROPOST</option>
            `;

        var strOptionsDOMINIO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_DM">TOTS</option>
            <option value="PB" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPBL">PÚBLIC</option>
            <option value="PV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPRV">PRIVAT</option>
         `; 

     
        var strOptionsDOTACIONAL=`<option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_ORD">TOTS</option>`;
      
        let info_dotacional= await readDataFeatureRPG("usodot_sgsu_visor","fid>0");
        for(var n=0;n<info_dotacional.features.length;n++)
            strOptionsDOTACIONAL=strOptionsDOTACIONAL+`<option value="${info_dotacional.features[n].properties.uso}" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt${info_dotacional.features[n].properties.uso}">${info_dotacional.features[n].properties.descripcion_uso}</option>`;
         
        
        var strSelectEP=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectEP" >
                  ${strOptionsEP}
                  </select>`;
        var strSelectDOMINIO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOM" >
                  ${strOptionsDOMINIO}
                  </select>`;
        var strSelectDOTACIONAL=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectDOM" id="selectDOT" >
                  ${strOptionsDOTACIONAL}
                  </select>`;
       
        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>EXISTENT/PROPOST</label></td>
                <td>${strSelectEP}</td>
            
            </tr>    
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>DOMINI</label></td>
                <td>${ strSelectDOMINIO}</td>         
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ÚS DOTACIONAL</label></td>
                <td>${strSelectDOTACIONAL}</td>
           
            </tr> 
              
        </TABLE>`;

        console.log("pasa final option quer SLEQ")

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }
   

    if(tipo=="NADA"){
        html="";
        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="AANP"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="AANP-AC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAANP-AC">(AANP-AC) Parc Nacional Marítim-Terrestre de l'Arxipèlag de Cabrera</option>
            <option value="AANP-AV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAANP-AV">(AANP-AV) ZEC ES5310042 Avenc d’a Corbera (AV)</option>
            <option value="AANP-PU" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAANP-PU">(AANP-PU) ZEC ES5310080 de Puigpunyent (PU)</option>
            <option value="AANP-XO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAANP-XO">(AANP-XO) ZEC  ES5310102 Xorrigo</option>
            <option value="AANP-PN" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAANP-PN">(AANP-PN) Hàbitats i formacions geològiques, ANEI 47 Paratge Natural Serra Tramuntana</option>
            <option value="AANP-GE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAANP-GE">(AANP-GE)  Subcategoria AANP de règim general</option>
            
            `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

        var strOptionsZONA=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="AC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_AC">(AC) Archipielago de Cabrera</option>
            <option value="BX" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_BX">(BX) Barrancos de Son Gual y Xorrigo</option>
            <option value="CO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_CO">(CO) Costa</option>
            <option value="ST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_ST">(ST) Sierra de Tramuntana</option>  
            `;

         var strSelectZONA=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectZONA" >
                    ${strOptionsZONA}
                    </select>`;

        var strOptionsPROT=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense plà protecció</option>
            <option value="PGXN2000BMM" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPGXN2000BMM">(PGXN2000BMM) Pla de Gestió  Xarxa Natura 2000 Barrancs i montes de Mallorca</option>
            <option value="PGXN2000C" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPGXN2000C">(PGXN2000C) Pla de Gestió Xarxa Natura 2000 Coves</option>
            <option value="PGXN2000ST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPGXN2000ST">(PGXN2000ST) Pla de Gestió Xarxa natura 2000  Serra de Tramuntana</option>
            <option value="PORNST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPORNST">(PORNST) Pla d ´Ordenació de Recursos Naturals Serra de Tramuntana</option>
            <option value="PRUGAC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPRUGAC">(PRUGAC) Pla Rector d'Usos i Gestió Arxipielag de Cabrera</option>
            <option value="PGXN2000AC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPGXN2000AC">(PGXN2000AC) Pla de Gestió Xarxa Natura 2000 Arxipielag de Cabrera</option>  
            `;
              
        var strSelectPROT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectPROT" >
                    ${strOptionsPROT}
                    </select>`;

        var strOptionsFPROT=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense plà protecció</option>
            <option value="PNMTAC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPNMTAC">(PNMTAC) Parque Nacional Marí­timo Terrestre del Archipielago de Cabrera</option>
            <option value="ZEC ES/000083" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPZEC_ES000083">(ZEC ES/000083) ZEC Archipielago de Cabrera, Zona de Especial Conservación ZEC ES/000083</option>
            <option value="PNST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPNST">(PNST) Paraje Natural Sierra de Tramuntana</option>
            <option value="ZEC/ES5310042" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZEC_ES5310042">(ZEC/ES5310042) Zona de Especial conservación ZEC/ES5310042 Avenc d´en Corbera</option>
            <option value="ZEC/ES5310080" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZEC_ES5310080">(ZEC/ES5310080 Puigpunyent) Zona Especial de Conservación ZEC/ES5310080 Puigpunyent,</option>
            <option value="ZEC/ES5310102" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZEC_ES5310102">(ZEC/ES5310102 Xorrigo) Zona Especial de Conservación ZEC/ES5310102 Xorrigo</option>  
            `;
              
        var strSelectFPROT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectFPROT" >
                    ${strOptionsFPROT}
                    </select>`;
        
        var strOptionsTIPO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="AC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAC">(AC) Archipielago</option>
            <option value="AL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAL">(AL) Encinares</option>
            <option value="AV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAV">(AV) Avenc</option>
            <option value="BA" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optBA">(BA) Barrancos</option>
            <option value="CI" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCI">(CI) Cimas y Peñascos más significativos </option>
            <option value="CV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optCV">(CV) Comunidades Vegetales de Litoral Rocoso</option>
            <option value="FG" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optFG">(FG) Formaciones Geomorfológicas</option>
            <option value="ILL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optILL">(ILL) Islote</option>
            <option value="ULL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optULL">(ULL) Acebuchales</option> 
            `;
              
        var strSelectTIPO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectAANPTIPO" id="selectAANPTIPO" >
                    ${strOptionsTIPO}
                    </select>`;
      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>
            
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                <td>${strSelectZONA}</td>
            
            </tr>  
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>PLÀ PROTECCIÓ</label></td>
                <td>${strSelectPROT}</td>
            
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>FIGURA PROTECCIÓ</label></td>
                <td>${strSelectFPROT}</td>
            
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPUS</label></td>
                <td>${strSelectTIPO}</td>
            
            </tr>          
            
         
        </TABLE>`;

        

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="ANEI"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="ANEI-PN" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optANEI-PN">(ANEI-PN) ANEI localitzats en Paratge Natural.</option>
            <option value="ANEI-GE" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optANEI-SGIXO">(ANEI-GE) ANEI General, localitzats fora de Paratge Natural. </option>
           
            `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

        var strOptionsZONA=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="BX" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_BX">(BX) Barrancos de Son Gual y Xorrigo</option>
            <option value="ST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_ST">(ST) Sierra de Tramuntana</option>  
            `;

        var strSelectZONA=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectZONA" id="selectZONA" >
                    ${strOptionsZONA}
                    </select>`;
        
        var strOptionsPROT=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense plà protecció</option>
            <option value="PORNST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPORNST">(PORNST) Pla d ´Ordenació de Recursos Naturals Serra de Tramuntana</option>
            `;
              
        var strSelectPROT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectPROT" >
                    ${strOptionsPROT}
                    </select>`;

        var strOptionsFPROT=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense plà protecció</option>
            <option value="PNST" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPNST">(PNST) Paraje Natural Sierra de Tramuntana</option>
           `;
              
        var strSelectFPROT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectFPROT" >
                    ${strOptionsFPROT}
                    </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>         
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                <td>${strSelectZONA}</td>         
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>PLÀ PROTECCIÓ</label></td>
                <td>${strSelectPROT}</td>  
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>FIGURA PROTECCIÓ</label></td>
                <td>${strSelectFPROT}</td>          
            </tr>  
         
        </TABLE>`;
      

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="AIN"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="AIN-AG" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAG">(AIN-AG) Aiguamolls</option>
            <option value="AIN-FO_PP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIN-FO_PP">(AIN-FO_PP) Forestal qualificades de Parc Públic Periurbà </option>
            <option value="AIN-FO_ZB" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIN-FO_ZB">(AIN-FO_ZB) AIN forestal altres zones boscosas</option>
            <option value="AIN-RM" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIN-RM">(AIN-RM) Domini públic natural de la ribera de la mar</option>
            <option value="AIN-XF_T" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIN-XF_T">(AIN-XF_T) Xarxa Fluvial-Torrents</option>
           
            `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

        var strOptionsZONA=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense zona</option>
            <option value="BV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_BV">(BV) Bellver</option>
            <option value="CO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_CO">(CO) Costa</option>  
            <option value="LV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_LV">(LV) Zona de Levante</option>  
            <option value="PP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_PP">(PP) Humedal del Prat des Pil-Lari</option>  
            <option value="PU" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_PU">(PU) Puntiró</option>
            <option value="SA" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_SA">(SA) San Agustín</option>
            <option value="SD" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_SD">(SD) Son Dureta</option>
            <option value="SF" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_SF">(SF) Humedal de Ses Fontanelles</option>
            <option value="SG" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_SG">(SG) Son Gual</option>  
            <option value="ZP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZona_ZP">(ZP) Zona de Poniente</option>  
              
            `;

        var strSelectZONA=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectZONA" id="selectZONA" >
                    ${strOptionsZONA}
                    </select>`;

        var strOptionsPROT=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense plà protecció</option>
            <option value="LEY23_20_2006_CAP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optLEY23_20_2006_CAP">(LEY23_20_2006_CAP) Ley 23/2006 de 20 de Diciembre de capitalidad</option>
            <option value="PHDIB-MAM727" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPHDIB-MAM727">(PHDIB-MAM727) Plan Hidrologico de la demarcación Hidrográfica de las Islas Baleares</option>
            <option value="PHDIB-MAZH26" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optPHDIB-MAZH26">(PHDIB-MAZH26) Plan Hidrologico de la demarcación Hidrográfica de las Islas Baleares</option>
            `;
              
        var strSelectPROT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectPROT" >
                    ${strOptionsPROT}
                    </select>`;

        var strOptionsFPROT=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense plà protecció</option>
            <option value="Legislación de Costas " style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optLEG_COSTAS">Ley 22/1988, de 20 de Julio de Costas</option>
           `;
              
        var strSelectFPROT=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectFPROT" >
                    ${strOptionsFPROT}
                    </select>`;

        var strOptionsTIPO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="AG" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAG">(AG) Humedal</option>
            <option value="F" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optF">(F) Terreno con características Forestales y Ecológicas</option>
            <option value="SA" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSA">(SA) Sabinar</option>
            <option value="ULL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optBA">(ULL) Acebuchales</option>
            <option value="ZAL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZAL">(ZAL) Encinares</option>
            `;
              
        var strSelectTIPO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectAANPTIPO" id="selectAINTIPO" >
                    ${strOptionsTIPO}
                    </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>           
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ZONA</label></td>
                <td>${strSelectZONA}</td>         
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>PLÀ PROTECCIÓ</label></td>
                <td>${strSelectPROT}</td>  
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>FIGURA PROTECCIÓ</label></td>
                <td>${strSelectFPROT}</td>          
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPUS</label></td>
                <td>${strSelectTIPO}</td>
            
            </tr>   
         
        </TABLE>`;

        

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="ARIP"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="ARIP-ZL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARIP-ZL">(ARIP-ZL) Zona de Levante</option>
            <option value="ARIP-ZP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARIP-ZP">(ARIP-ZP) Zona de Poniente</option>
             `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>
            
            </tr> 
         
        </TABLE>`;

        

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="ZIP"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="ZIP-EM" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZIP-EM">(ZIP-EM) Zona Rural el Molinar</option>
            <option value="ZIP-EMR" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZIP-EMR">(ZIP-EMR) Entorno Monasterio Real</option>
            <option value="ZIP-PV" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optZIP-PV">(ZIP-PV) Zona Rural Son Rapinya-Puigdorfila Vell</option>
             `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="APR"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="APR-CN" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPR-CN">(APR-CN) Zona de prevenció de risc de contaminació d'aqüífers</option>
            <option value="APR-ER" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPR-ER">(APR-ER) Zona de prevenció  de risc d'erosió</option>
            <option value="APR-ES" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPR-ES">(APR-ES) Zona de prevenció de risc d’esllavissaments</option>
            <option value="APR-IF" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPR-IF">(APR-IF) Àrees de prevenció de risc d'incendi forestal</option>
            <option value="APR-IN" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPR-IN">(APR-IN) Àrees de prevenció de risc d'inundació</option>
             `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

         var strOptionsTIPO=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_PROT">TOTS</option>
            <option value="-" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO">Sense tipus</option>
            <option value="Alta" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAlta">Vulnerabilidad Alta</option>
            `;
              
        var strSelectTIPO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectAPRTIPO" id="selectAPRTIPO" >
                    ${strOptionsTIPO}
                    </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>          
            </tr>
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPUS</label></td>
                <td>${strSelectTIPO}</td>         
            </tr>    
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="APT"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="APT-C-V" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPT-C-V">(APT-C-V) Viario</option>
            <option value="APT-C-ZD" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPT-C-ZD">(APT-C-ZD) Zona de Dominio</option>
            <option value="APT-C-ZP" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAPT-C-ZP">(APT-C-ZP) Zona de Protección</option>
             `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="AIA"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="AIA-I_40" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIA-40">(AIA-40) Zones d'alt valor edafològic,</option>
            <option value="AIA-I_100" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIA-100">(AIA-100) zones d'interès agrari de terrenys de secà</option>
             `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;

      

        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SRC"){

        var strOptionsSUBCATE=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_SUBCAT">TOTS</option>
            <option value="AIA-100" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optAIA-100">(SRC-AIA-100) Áreas de Interés Agrario 100</option>
            <option value="SRC-AIA-40" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSRC-AIA-40">(SRC-AIA-40) Áreas de Interés Agrario 40</option>
            <option value="SRC-AT-H" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSRC-AT-H">(SRC-AT-H) Áreas de Transición de Armonización</option>
            <option value="SRC-SRG" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSRC-SRG">(SRC-SRG) Suelo Rústico General</option>
            <option value="SRC-SRG-F" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSRC-SRG-F">(SRC-SRG-F) Suelo Rústico General Forestal</option>
             `;
        
        var strSelectSUBCATE=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectSUBCATE" >
                  ${strOptionsSUBCATE}
                  </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectSUBCATE}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="AT-H"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="SRG"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="NR"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

    if(tipo=="SUB"){

        var strOptionsUSOS=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="RESIDENCIAL-TERCIARIO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRESIDENCIAL-TERCIARIO">RESIDENCIAL-TERCIARIO</option>
            <option value="RESIDENCIAL-TURISTICO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRESIDENCIAL-TURISTICO">RESIDENCIAL-TURISTICO</option>
            <option value="TERCIARIO-INDUSTRIAL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTERCIARIO-INDUSTRIAL">TERCIARIO-INDUSTRIAL</option>
           
             `;
        
        var strSelectUSOS=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectUSOS" >
                  ${strOptionsUSOS}
                  </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>SUBCATEGORIA</label></td>
                <td>${strSelectUSOS}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="ZOU"){

        var strOptionsUSOS=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="RESIDENCIAL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRESIDENCIAL">RESIDENCIAL</option>
            <option value="R/T" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRESIDENCIAL-TERCIARIO">RESIDENCIAL-TERCIARIO</option>
            <option value="TERCIARIA" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTERCIARIO">TERCIARIO</option>
            <option value="INDUSTRIAL" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optINDUSTRIAL">INDUSTRIAL</option>
            <option value="TURISTICO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTURISTICO">TURISTICO</option>
           
             `;
        
        var strSelectUSOS=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectUSOS" >
                  ${strOptionsUSOS}
                  </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>USOS</label></td>
                <td>${strSelectUSOS}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="API"){

        var strOptionsTIPOS=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="2.1.6.1" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_6_1">2.1.6.1 Árees que tenen Plans Especials aprovats ja reconeguts com API en el PGOU 1998 i que encara compten amb unitats d'actuació o actuacions aïllades pendents d'execució</option>
            <option value="2.1.6.2" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_6_2">2.1.6.2 Àrees que compten amb Plans Especials de desenvolupament del PGOU 1998 aprovats definitivament</option>
            <option value="2.1.6.3" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_6_3">2.1.6.3 Sòl urbanitzable del PGOU 1998 que compten amb Pla Parcial aprovat i que, per haver executat la urbanització, mereixen la classificació de sòl urbà</option>
            <option value="2.1.6.4" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_6_4">2.1.6.4 SUNP 79-01 del PGOU 1998 que va rebre la denominació de SUP-3 en el PRI Platja Palma</option>
            <option value="2.1.6.5" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_6_5">2.1.6.5 Àmbit territorial del Pla de Reconversió Integral de Platja Palma exclusivament pel que concerneix els terrenys classificats com a sòl urbà</option> 
            <option value="2.1.6.6" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_6_6">2.1.6.6 L'àrea RES 47/08 Són Güells</option> 
            <option value="2.1.7.1" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_7_1">2.1.7.1 PERI Es Jonquet, aprovat definitivament el 18/12/1985 (amb les seves modificacions posteriors)</option> 
            <option value="2.1.7.5" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="opt2_1_7_5">2.1.7.5 El sector de sòl urbà Llevant-Façana Marítima</option> 
            `;
        
        var strSelecTIPOS=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectTIPOS" >
                  ${strOptionsTIPOS}
                  </select>`;

        var strOptionsUSOS=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="RES" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optRESIDENCIAL">RESIDENCIAL</option>
            <option value="SEC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optSECUNDARIO">SECUNDARIO</option>
            <option value="TER" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTERCIARIO">TERCIARIO</option>
            <option value="TUR" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTURISTICO">TURISTICO</option>
            <option value="EQ" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEQ">EQUIPAMIENTO</option>
           
             `;
        
        var strSelectUSOS=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectUSOS" >
                  ${strOptionsUSOS}
                  </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPO</label></td>
                <td>${strSelecTIPOS}</td>
            
            </tr> 

            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>USO</label></td>
                <td>${strSelectUSOS}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="ATU"){

        var strOptionsTIPOS=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="ARG" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARG">(ARG) ACTUACIONS DE REGENERACIÓ URBANA</option>
            <option value="ARI-CMU" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARI-CMU">(ARI CMU) ACTUACIONS DE REFORMA INTERIOR</option>
            <option value="ARU" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARU">(ARU) ACTUACIONS DE RENOVACIÓ URBANA</option>
            <option value="ARU-T" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARU_T">(ARU-T) ACTUACIONS DE RENOVACIÓ URBANA TRANSITÒRIES</option>
            <option value="ARU/RC" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optARU_RC">(ARU/RC) ACTUACIONS DE RENOVACIÓ URBANA</option>
             `;
        
        var strSelectTIPOS=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectTIPOS" >
                  ${strOptionsTIPOS}
                  </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>TIPOS</label></td>
                <td>${strSelectTIPOS}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    /*if(tipo=="SGEC"){

        var strOptionsGESTION=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="OBTENIDO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optOBTENIDO">OBTENIDO</option>
            <option value="NO OBTENIDO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO_OBTENIDO">NO OBTENIDO</option>
            
             `;
        
        var strSelectGESTION=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectGESTION" >
                  ${strOptionsGESTION}
                  </select>`;

        var strOptionsESTADO=`
                  <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
                  <option value="EJECUTADO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEJECUTADO">EJECUTADO</option>
                  <option value="NO EJECUTADO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO_EJECUTADO">NO EJECUTADO</option>
                  
                   `;
              
        var strSelectESTADO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectESTADO" >
                        ${strOptionsESTADO}
                        </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>GESTIÓ</label></td>
                <td>${strSelectGESTION}</td>
            
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ESTAT</label></td>
                <td>${strSelectESTADO}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }*/

    if(tipo=="SGSI"){

        var strOptionsGESTION=`
            <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
            <option value="OBTENIDO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optOBTENIDO">OBTENIDO</option>
            <option value="NO OBTENIDO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO_OBTENIDO">NO OBTENIDO</option>
            
             `;
        
        var strSelectGESTION=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectGESTION" >
                  ${strOptionsGESTION}
                  </select>`;

        var strOptionsESTADO=`
                  <option value="TOTS" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optTOTS_USOS">TOTS</option>
                  <option value="EJECUTADO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optEJECUTADO">EJECUTADO</option>
                  <option value="NO EJECUTADO" style='font-size:7.5pt.5pt;font-family:Arial;color:#660000' id="optNO_EJECUTADO">NO EJECUTADO</option>
                  
                   `;
              
        var strSelectESTADO=`<select onchange='changeQUERY_RPG()' style='background-color:#e6e6e6;padding:2px;font-size:8pt;font-family:Arial;width:98%;height:20px;overflow: scroll' name="selectEP" id="selectESTADO" >
                        ${strOptionsESTADO}
                        </select>`;


        html=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>GESTIÓ</label></td>
                <td>${strSelectGESTION}</td>
            
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ESTAT</label></td>
                <td>${strSelectESTADO}</td>
            
            </tr> 
         
        </TABLE>`;
  

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
      
    }

    if(tipo=="SGCT"){

        html="";

        var elem = document.getElementById('divOptionsQUERY_RPG');   
        elem.innerHTML=html;
    }

   
  


    changeQUERY_RPG();



}

async function changeQUERY_RPG(tipo,ext_prop){

  
    var elem = document.getElementById('selectTablesRPG'); 
    if(elem!=null) tipo=elem.value;  

    var tipo
    var ext_prop
    var dominio
    var dotacional
    var ordenacion

    elem = document.getElementById('selectEP'); 
    if(elem!=null) ext_prop=elem.value;  
    elem = document.getElementById('selectDOM'); 
    if(elem!=null) dominio=elem.value; 
    elem = document.getElementById('selectDOT'); 
    if(elem!=null)  dotacional=elem.value; 
    elem = document.getElementById('selectORD'); 
    if(elem!=null) ordenacion=elem.value; 

   


    var tabla="";
    var filter="fid>0";

    console.log("tipo="+tipo)

    if(tipo=="CAT"){

        filter="codigo<>'-'";

        elem = document.getElementById('selectPROT_CAT'); 
        if(elem!=null) prot_cat=elem.value;  

        if(prot_cat!="TOTS")
        filter=filter+" AND proteccion='"+prot_cat+"'";

    }

    if(tipo=="CAT_MOL"){

        filter="codigo<>'-'";

        elem = document.getElementById('selectPROT_CAT'); 
        if(elem!=null) prot_cat=elem.value;  

        if(prot_cat!="TOTS")
        filter=filter+" AND proteccion='"+prot_cat+"'";

    }

    if(tipo=="CH"){

        filter="codigo like 'N%' or codigo like 'R%'"

        elem = document.getElementById('selectCH'); 
        if(elem!=null) prot_cat=elem.value;  

        if(prot_cat!="TOTS")
        filter="codigo like '"+prot_cat+"%'";

    }

    if(tipo=="RSD"){

        filter="uso_global like '%Residencial%'";

        elem = document.getElementById('selectUSO_PRED'); 
        if(elem!=null) uso_pred=elem.value;  
        elem = document.getElementById('selectSIST_ORD'); 
        if(elem!=null) sist_ord=elem.value;  
        elem = document.getElementById('selectTIPO_EDIF'); 
        if(elem!=null) tipo_edif=elem.value;  
        elem = document.getElementById('selectZONA_RSD'); 
        if(elem!=null) zona=elem.value;  

        if(uso_pred!="TOTS")
        filter=filter+" AND uso_predominante='"+uso_pred+"'";
        if(sist_ord!="TOTS"){

            if(sist_ord=="AV") 
                filter=filter+" AND (tipo_edificacion='AV-MC.R.' OR tipo_edificacion='AV-MC.V.')";
            if(sist_ord=="RP") 
                filter=filter+" AND (tipo_edificacion='RP.S.' OR tipo_edificacion='RP.A.')";
            if(sist_ord=="VE") 
                filter=filter+" AND (tipo_edificacion='VE')";
        }
        if(tipo_edif!="TOTS")
            filter=filter+" AND tipo_edificacion='"+tipo_edif+"'";
        if(zona!="TOTS")
            filter=filter+" AND agrupacion='"+zona+"'";



    }

    if(tipo=="IND"){

        filter="uso_global like '%Industrial%'";

        elem = document.getElementById('selectZONA_IND'); 
        if(elem!=null) zona=elem.value;  

        if(zona!="TOTS")
        filter=filter+" AND agrupacion='"+zona+"'";

    }

    if(tipo=="TER"){

        filter="uso_global like '%Terciari%'";

        elem = document.getElementById('selectSIST_ORD'); 
        if(elem!=null) sist_ord=elem.value;  
        elem = document.getElementById('selectTIPO_EDIF'); 
        if(elem!=null) tipo_edif=elem.value;  
        elem = document.getElementById('selectZONA_TER'); 
        if(elem!=null) zona=elem.value;  

        if(sist_ord!="TOTS"){

            if(sist_ord=="AV") 
                filter=filter+" AND (tipo_edificacion='AV-MC.R.' OR tipo_edificacion='AV-MC.V.')";
            if(sist_ord=="RP") 
                filter=filter+" AND (tipo_edificacion='RP.S.' OR tipo_edificacion='RP.A.')";
            if(sist_ord=="VE") 
                filter=filter+" AND (tipo_edificacion='VE')";
        }
        if(tipo_edif!="TOTS")
            filter=filter+" AND tipo_edificacion='"+tipo_edif+"'";
        if(zona!="TOTS")
            filter=filter+" AND agrupacion='"+zona+"'";

    }

    if(tipo=="TUR"){

        filter="uso_global like '%Turístic%'";

        elem = document.getElementById('selectZONA_TUR'); 
        if(elem!=null) zona=elem.value;  

        if(zona!="TOTS")
            filter=filter+" AND agrupacion='"+zona+"'";

    }

    if(tipo=="SLEQ"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 
        elem = document.getElementById('selectORD'); 
        if(elem!=null) ordenacion=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
        if(ordenacion!="TOTS")
           filter=filter+" AND ordenacion='"+ordenacion+"'";
    
    }     

    if(tipo=="SLEL"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectORD'); 
        if(elem!=null) ordenacion=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(ordenacion!="TOTS")
           filter=filter+" AND identificante='"+ordenacion+"'";
    
    }     

    if(tipo=="SGEC"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 
        elem = document.getElementById('selectORD'); 
        if(elem!=null) ordenacion=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
        if(ordenacion!="TOTS")
           filter=filter+" AND ordenacion='"+ordenacion+"'";
    
    }    
    
    if(tipo=="SGEL"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
    
    }   

    if(tipo=="SGC"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
    
    }    
    
    if(tipo=="SGIF"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
    
    }    

    if(tipo=="SGSU"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
    
    }    

    // AANP

    if(tipo=="AANP"){

        filter="categoria='AANP'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectZONA'); 
        if(elem!=null) zona=elem.value;
        elem = document.getElementById('selectPROT'); 
        if(elem!=null) prot=elem.value;
        elem = document.getElementById('selectFPROT'); 
        if(elem!=null) fprot=elem.value;
        elem = document.getElementById('selectAANPTIPO'); 
        if(elem!=null) tipo_aanp=elem.value;

        if(subcategoria!="TOTS")
           filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(zona!="TOTS")
           filter=filter+" AND zona='"+zona+"'";
        if(prot!="TOTS")
           filter=filter+" AND plan_proteccion LIKE '%"+prot+"%'";
        if(fprot!="TOTS")
           filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%'";
        if(tipo_aanp!="TOTS")
           filter=filter+" AND tipo='"+tipo_aanp+"'";

     }

    // ANEI

    if(tipo=="ANEI"){

        filter="categoria='ANEI'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectZONA'); 
        if(elem!=null) zona=elem.value;
        elem = document.getElementById('selectPROT'); 
        if(elem!=null) prot=elem.value;
        elem = document.getElementById('selectFPROT'); 
        if(elem!=null) fprot=elem.value;

        if(subcategoria!="TOTS")
           filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(zona!="TOTS")
           filter=filter+" AND zona='"+zona+"'";
        if(prot!="TOTS")
           filter=filter+" AND plan_proteccion LIKE '%"+prot+"%'";
        if(fprot!="TOTS"){
            if(fprot=="-")
            filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%' or figura_proteccion='No'";
            else
                filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%'";
        }

    }

   // AIN-PG

    if(tipo=="AIN"){

        filter="categoria='AIN'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectZONA'); 
        if(elem!=null) zona=elem.value;
        elem = document.getElementById('selectPROT'); 
        if(elem!=null) prot=elem.value;
        elem = document.getElementById('selectFPROT'); 
        if(elem!=null) fprot=elem.value;
        elem = document.getElementById('selectAINTIPO'); 
        if(elem!=null) tipo_aanp=elem.value;

        if(subcategoria!="TOTS")
           filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(zona!="TOTS")
           filter=filter+" AND zona='"+zona+"'";
        if(prot!="TOTS")
           filter=filter+" AND plan_proteccion LIKE '%"+prot+"%'";
        if(fprot!="TOTS")
           filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%'";
        if(tipo_aanp!="TOTS")
           filter=filter+" AND tipo='"+tipo_aanp+"'";

    }

    // ZPRP-PG

    if(tipo=="ZIP"){

        filter="categoria='ZIP'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";      

    }

    // AIN-PG

    if(tipo=="ARIP"){

        filter="categoria='ARIP'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";
       
    }

    // APR

    if(tipo=="APR"){

        filter="categoria='APR'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectAPRTIPO'); 
        if(elem!=null) tipo_apr=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(tipo_apr!="TOTS")
            filter=filter+" AND tipo='"+tipo_apr+"'";
       
    }

     // APT-C

     if(tipo=="APT"){

        filter="categoria='APT-C'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";      

    }

    // AIA

    if(tipo=="AIA"){

        filter="categoria='AIA'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";      

    }

    // AT-H

    if(tipo=="AT-H"){

        filter="categoria='AT-H'";

    }

    // SRG

    if(tipo=="SRG"){

        filter="categoria='SRG'";

    }

    // NR

    if(tipo=="NR"){

        filter="categoria='NR'";

    }

    // SRC

    if(tipo=="SRC"){

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";
       
    }

    // SUB

    if(tipo=="SUB"){

        elem = document.getElementById('selectUSOS'); 
        if(elem!=null) usos=elem.value;

        if(usos!="TOTS")
            filter=filter+" AND uso='"+usos+"'";
       
    }

    // ZOU

    if(tipo=="ZOU"){

        elem = document.getElementById('selectUSOS'); 
        if(elem!=null) usos=elem.value;

        if(usos!="TOTS")
            filter=filter+" AND uso='"+usos+"'";
       
    }

    // API

    if(tipo=="API"){

        elem = document.getElementById('selectTIPOS'); 
        if(elem!=null) tipos=elem.value;
        elem = document.getElementById('selectUSOS'); 
        if(elem!=null) usos=elem.value;

        if(tipos!="TOTS")
            filter=filter+" AND normativa='"+tipos+"'";
        if(usos!="TOTS")
            filter=filter+" AND uso_global like '%"+usos+"%'";
       
    }

    // ATU

    if(tipo=="ATU"){

        elem = document.getElementById('selectTIPOS'); 
        if(elem!=null) tipos=elem.value;

        if(tipos!="TOTS")
            filter=filter+" AND tipo='"+tipos+"'";
       
    }

    // SGEC

   /* if(tipo=="SGEC"){

        elem = document.getElementById('selectGESTION'); 
        if(elem!=null) gestion=elem.value;

        if(gestion!="TOTS")
            filter=filter+" AND gestion='"+gestion+"'";

        elem = document.getElementById('selectESTADO'); 
        if(elem!=null) estado=elem.value;
    
        if(estado!="TOTS")
            filter=filter+" AND estado='"+estado+"'";
       
    }*/

    // SGEC

    if(tipo=="SGSI"){

        elem = document.getElementById('selectGESTION'); 
        if(elem!=null) gestion=elem.value;

        if(gestion!="TOTS")
            filter=filter+" AND gestion='"+gestion+"'";

        elem = document.getElementById('selectESTADO'); 
        if(elem!=null) estado=elem.value;
    
        if(estado!="TOTS")
            filter=filter+" AND estado='"+estado+"'";
       
    }

   
    

   console.log("filter",filter);

    switch(tipo){

        case "NADA":
            var elem = document.getElementById('divQUERY_RPG');   
    
            elem.innerHTML=""; 
            break;
        case "CAT":
            table="catalogos"
            queryCATALOGOS_RPG(table, filter)
            break   
        case "CAT_MOL":
            table="catalogos_molinos"
            queryCATALOGOS_RPG(table, filter)
            break  
        case "CH":
            table="calific_zonas"
            queryCH(table, filter)
            break   
        case "r":
            table="preservacion"
            queryCH(table, filter)
            break  
        case "RSD":
            table="vm_calificaciones_zonas"
            queryCALIFICACIONES_RPG(table, filter)
            break   
        case "IND":
            table="vm_calificaciones_zonas"
            queryCALIFICACIONES_RPG(table, filter)
            break 
        case "TER":
            table="vm_calificaciones_zonas"
            queryCALIFICACIONES_RPG(table, filter)
            break   
        case "TUR":
            table="vm_calificaciones_zonas"
            queryCALIFICACIONES_RPG(table, filter)
            break 
        case "AANP":
            table="suelo_rustico";
            queryAANP(table, filter);
            break;
        case "ANEI":
            table="suelo_rustico";
            queryANEI(table, filter);
            break;
        case "AIN":
            table="suelo_rustico";
            queryAIN_PG(table, filter);
            break;
        case "ARIP":
            table="suelo_rustico";
            queryARIP(table, filter);
            break;
        case "ZIP":
            table="suelo_rustico";
            queryZIP(table, filter);
            break;
        case "APR":
            table="suelo_rustico";
            queryAPR(table, filter);
            break;
        case "APT":
            table="suelo_rustico";
            queryAPT_C(table, filter);
            break;
        case "AIA":
            table="suelo_rustico";
            querySRC(table, filter);
            break;
        case "AT-H":
            table="suelo_rustico";
            querySRC(table, filter);
            break;
        case "SRG":
            table="suelo_rustico";
            querySRC(table, filter);
            break;
        case "SRC":
            table="suelo_rustico";
            querySRC(table, filter);
            break;
        case "NR":
            table="suelo_rustico";
            queryNR(table, filter);
            break;
        case "SUB":
            table="suelo_urbanizable";
            querySUB(table, filter);
            break;
        case "ZOU":
            table="zou";
            queryZOU(table, filter);
            break;
        case "API":
            table="api_rev";
            queryAPI(table, filter);
            break;
        case "ATU":
            table="atu_su";
            queryATU(table, filter);
            break;
        case "SLEQ":
            table="v_sistema_local_equipamientos_cat";
            querySLEQ_RPG(table, filter);
            break;
        case "SLEL":
            table="v_sistema_local_espacios_libres_cat";
            querySLEL_RPG(table, filter);
            break;
        case "SLC":
            table="sistema_local_comunicaciones";
            querySLC_RPG(table, filter);
            break;
        case "SLIF":
            table="sistema_local_infraestructuras";
            querySLIF_RPG(table, filter);
            break;
        case "SLSU":
            table="sistema_local_servicios_urbanos";
            querySLSU_RPG(table, filter);
            break;
        case "SGEC":
            table="v_sistema_general_equipamientos_cat";
            querySLEQ_RPG(table, filter);
            break;
        case "SGEL":
            table="v_sistema_general_espacios_libres_cat";
            querySLEL_RPG(table, filter);
            break;
        case "SGC":
            table="v_sistema_general_comunicaciones_cat";
            querySGIF_RPG(table, filter);
            break;
        case "SGIF":
            table="v_sistema_general_infraestructuras_cat";
            querySGIF_RPG(table, filter);
            break;
        case "SGSU":
            table="v_sistema_general_servicios_urbanos_cat";
            querySGIF_RPG(table, filter);
            break;
       
       

    }


   
}


async function download(name, type) {

    // escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"download:"+name};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    console.log(jsonData);
    var a = document.createElement("a");
    var file = new Blob([jsonData], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();

    

    // zip

    /* var zip = new JSZip();
    
    zip.file(name, file);
    zip.generateAsync({type:"blob"})
        .then(function(content) {
        
         saveAs(content, "consultas.zip");
        
    }); */
}

async function queryCATALOGOS_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

  jsonData = JSON.stringify(info_geojson);

  var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>PROTECCIÓ</td>
              <th>DENOMINACIÓ</td>                  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

  

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.superficie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.proteccion}</td>
                  <td>${info_geojson.features[n].properties.denominacion}</td>
                       
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryCH(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

  jsonData = JSON.stringify(info_geojson);

  var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
                       
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

  

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.superficie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                 
                       
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryCALIFICACIONES_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

  jsonData = JSON.stringify(info_geojson);

  var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>US PREDOMINANT</td>
              <th>CODI</td>
              <th>SISTEMA ORDENACIÓ</td>
              <th>TIPUS EDIFICACIÓ</td>
            
                  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

  

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.superficie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.uso_predominante}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.sistema_ordenacion}</td>
                  <td>${info_geojson.features[n].properties.tipo_edificacion}</td>
                 
                       
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySLEQ_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

  jsonData = JSON.stringify(info_geojson);

  var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>IDENTIFICANT</td>
              <th>DENOMINACIÓ</td>
              <th>SUPERFICIE</td>
              <th>ORDENACIÓ</td>
              <th>DOMINI</td>
              <th>ÚS</td>
              <th>Nº INVENTARI</LABEL></td>
              <th>CLASIF. SÒL</LABEL></td>
                  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

  

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.superficie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.identificante}</td>
                  <td>${info_geojson.features[n].properties.denominacion}</td>
                  <td>${area}</td>
                  <td>${info_geojson.features[n].properties.ordenacion}</td>
                  <td>${info_geojson.features[n].properties.dscr_dominio}</td>
                  <td>${info_geojson.features[n].properties.dscr_uso}</td>
                  <td>${info_geojson.features[n].properties.num_invent}</td>
                  <td>${info_geojson.features[n].properties.dscr_clasifsuelo}</td>
                       
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySLEL_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

    jsonData = JSON.stringify(info_geojson);

    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>IDENTIFICANT</td>
              <th>DENOMINACIÓ</td>
              <th>SUPERFICIE</td>
              <th>DOMINI</td>
              <th>ÚS</td>
              <th>Nº INVENTARI</LABEL></td>
              <th>CLASIF. SÒL</LABEL></td>               
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.supericie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.identificante}</td>
                  <td>${info_geojson.features[n].properties.denominacion}</td>
                  <td>${area}</td>
                  <td>${info_geojson.features[n].properties.dscr_dominio}</td>
                  <td>${info_geojson.features[n].properties.dscr_uso}</td>
                  <td>${info_geojson.features[n].properties.num_invent}</td>
                  <td>${info_geojson.features[n].properties.dscr_clasifsuelo}</td>
                       
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySLC_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

    jsonData = JSON.stringify(info_geojson);

    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>IDENTIFICANT</td>  
              <th>SUPERFICIE</td>
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.supericie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.codigo_fp}</td>
                  <td>${area}</td>
                 
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySLIF_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

    jsonData = JSON.stringify(info_geojson);

    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>IDENTIFICANT</td> 
              <th>SUPERFICIE</td> 
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.supericie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.identif}</td>
                  <td>${area}</td>
                 
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySLSU_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

    jsonData = JSON.stringify(info_geojson);

    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>IDENTIFICANT</td> 
              <th>SUPERFICIE</td> 
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.supericie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.identif}</td>
                  <td>${area}</td>
                 
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySGIF_RPG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");

  jsonData = JSON.stringify(info_geojson);

  var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>

      <TABLE id="table_query"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%"> 
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
     
      <thead style="background-color:#e1eefb;">
          <tr>
              <th>FID</td>
              <th>CODI</td>
              <th>IDENTIFICANT</td>
              <th>DENOMINACIÓ</td>
              <th>SUPERFICIE</td>
              <th>DOMINI</td>
              <th>ÚS</td>
              <th>Nº INVENTARI</LABEL></td>
              <th>CLASIF. SÒL</LABEL></td>
                  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";

  

    if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          var area=info_geojson.features[n].properties.superficie;
          if(area==0 || area==null) area=turf.area(info_geojson.features[n].geometry);
          if(area!=null) area=area.toFixed(2);

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td >${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>
                  <td>${info_geojson.features[n].properties.identificante}</td>
                  <td>${info_geojson.features[n].properties.denominacion}</td>
                  <td>${area}</td>
                  <td>${info_geojson.features[n].properties.dscr_dominio}</td>
                  <td>${info_geojson.features[n].properties.dscr_uso}</td>
                  <td>${info_geojson.features[n].properties.num_invent}</td>
                  <td>${info_geojson.features[n].properties.dscr_clasifsuelo}</td>
                       
              </tr>`;
      }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}



async function queryAANP(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso
    

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");

  jsonData = JSON.stringify(info_geojson);
  
  var html_QUERY_HEAD=`
      
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
       <!-- <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><img src="/images/icons_vsgis/delete16.png"></button> -->
        
      
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>DENOMINACIÓ</td>
              <th>ZONA</td>
              <th>DESCRIPCIO_ZONA</td>
              <th>SUBCATEGORIA</td>   
              <th>DESCRIPCIÓ_SUBCATEG.</td>  
              <th>PLÀ_PROTECCIÓ</td>   
              <th>DESCRIPCIÓ_PLÀ_PROT.</td>
              <th>FIGURA_PROT.</td>   
              <th>DESCRIPCIÓ_FIGURA_PROT.</td>
              <th>TIPO</td>    
          </tr>
          </thead>`;

  html_QUERY_ROWS="<tbody>";        

  if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.denominacion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.zona}</td>
                  <td>${info_geojson.features[n].properties.zona_descripcion}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcategoria_descripcion}</td>    
                  <td>${info_geojson.features[n].properties.plan_proteccion}</td>   
                  <td>${info_geojson.features[n].properties.plan_proteccion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.figura_proteccion}</td>   
                  <td>${info_geojson.features[n].properties.figura_proteccion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.tipo_descripcion}</td>                 
              </tr>`;
      }

  html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

  html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

 formatQueryRPG();

  var elem = document.getElementById('divQUERY_RPG');   
  console.log(elem.style.height);
  elem.style.height="70%";
  elem.innerHTML=html_QUERY; 

}

async function queryANEI(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
  let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
  console.log("info_geojson", info_geojson);
  jsonData = JSON.stringify(info_geojson);

  var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>DENOMINACIÓ</td>
              <th>ZONA</td>
              <th>DESCRIPCIO_ZONA</td>
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td> 
              <th>PLÀ_PROTECCIÓ</td>   
              <th>DESCRIPCIÓ_PLÀ_PROT.</td>
              <th>FIGURA_PROT.</td>   
              <th>DESCRIPCIÓ_FIGURA_PROT.</td>
          </tr>
          </thead>`;

  html_QUERY_ROWS="<tbody>";        

  if(info_geojson.features!=null)
      for(var n=0;n< info_geojson.features.length;n++){

          html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.denominacion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.zona}</td>
                  <td>${info_geojson.features[n].properties.zona_descripcion}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcategoria_descripcion}</td>
                  <td>${info_geojson.features[n].properties.plan_proteccion}</td>   
                  <td>${info_geojson.features[n].properties.plan_proteccion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.figura_proteccion}</td>   
                  <td>${info_geojson.features[n].properties.figura_proteccion_descripcion }</td>         
              </tr>`;
      }

  html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

  html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

 formatQueryRPG();

  var elem = document.getElementById('divQUERY_RPG');   
  console.log(elem.style.height);
  elem.style.height="70%";
  elem.innerHTML=html_QUERY; 

}

async function queryAIN_PG(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>DENOMINACIÓ</td>
              <th>ZONA</td>
              <th>DESCRIPCIO_ZONA</td>
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td>
              <th>PLÀ_PROTECCIÓ</td>   
              <th>DESCRIPCIÓ_PLÀ_PROT.</td>
              <th>FIGURA_PROT.</td>   
              <th>DESCRIPCIÓ_FIGURA_PROT.</td>
              <th>TIPO</td>      
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.denominacion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.zona}</td>
                  <td>${info_geojson.features[n].properties.zona_descripcion}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcategoria_descripcion}</td>
                  <td>${info_geojson.features[n].properties.plan_proteccion}</td>   
                  <td>${info_geojson.features[n].properties.plan_proteccion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.figura_proteccion}</td>   
                  <td>${info_geojson.features[n].properties.figura_proteccion_descripcion}</td>
                  <td>${info_geojson.features[n].properties.tipo_descripcion}</td>               
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryARIP(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>ZONA</td>
              <th>DESCRIPCIO_ZONA</td>
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                
                  <td>${info_geojson.features[n].properties.zona}</td>
                  <td>${info_geojson.features[n].properties.zona_descripcion}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcategoria_descripcion}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryZIP(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
            
              <th>ZONA</td>
              <th>DESCRIPCIO_ZONA</td>
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                
                  <td>${info_geojson.features[n].properties.zona}</td>
                  <td>${info_geojson.features[n].properties.zona_descripcion}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcategoria_descripcion}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryAPR(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td>
              <th>TIPO</td>    
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcat_des}</td>
                  <td>${info_geojson.features[n].properties.tipo_descripcion}</td>            
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryAPT_C(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>DENOMINACIÓ</td>
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.denom}</td>
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcat_des}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySRC(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
        <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>CATEGORIA</td>   
              <th>DESCR. CATEGORIA</td>  
              <th>SUBCATE</td>   
              <th>DESCR. SUBCATEG.</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.categoria}</td>    
                  <td>${info_geojson.features[n].properties.categoria_descripcion}</td>      
                  <td>${info_geojson.features[n].properties.subcategoria}</td>    
                  <td>${info_geojson.features[n].properties.subcategoria_descripcion}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryNR(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by subcategoria");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>CATEGORIA</td>   
              <th>DESCR. CATEGORIA</td>  
              <th>CODI</td>   
              <th>DENOMINACIÓ</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.categoria}</td>    
                  <td>${info_geojson.features[n].properties.categoria_descripcion}</td>      
                  <td>${info_geojson.features[n].properties.denominacion}</td>    
                  <td>${info_geojson.features[n].properties.denominacion_descripcion}</td>           
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySUB(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>CODI</td>   
              <th>DENOMINACIÓ</td>  
              <th>ÙS</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>    
                  <td>${info_geojson.features[n].properties.titulo}</td>     
                  <td>${info_geojson.features[n].properties.uso}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryZOU(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>CODI</td>   
              <th>DENOMINACIÓ</td>  
              <th>ÙS</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>    
                  <td>${info_geojson.features[n].properties.nombre}</td>     
                  <td>${info_geojson.features[n].properties.uso}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryAPI(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>CODI</td>   
              <th>DENOMINACIÓ</td>  
              <th>ÙS</td>  
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.codigo}</td>    
                  <td>${info_geojson.features[n].properties.denominacio}</td>     
                  <td>${info_geojson.features[n].properties.uso_global}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function queryATU(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>TIPUS</td>   
              <th>CODI</td>  
              <th>DENOMINACIÓ</td> 
              <th>ÀREA REPARTIMENT</td>
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.tipo}</td>    
                  <td>${info_geojson.features[n].properties.codigo}</td>     
                  <td>${info_geojson.features[n].properties.nombre}</td>   
                  <td>${info_geojson.features[n].properties.area_reparto}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySGEC(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>IDENTIF</td>   
              <th>CODI</td>  
              <th>DENOMINACIÓ</td> 
              <th>GESTIÓ</td>
              <th>ESTAT</td>
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.identif}</td>    
                  <td>${info_geojson.features[n].properties.codigo}</td>     
                  <td>${info_geojson.features[n].properties.denominaci}</td>   
                  <td>${info_geojson.features[n].properties.gestion}</td>     
                  <td>${info_geojson.features[n].properties.estado}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySGCT(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>IDENTIF</td>   
              <th>CODI</td>  
              <th>DENOMINACIÓ</td> 
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.identif}</td>    
                  <td>${info_geojson.features[n].properties.codigo}</td>     
                  <td>${info_geojson.features[n].properties.denominaci}</td>         
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function querySGEL(table, filter){

    //  escribir acceso

    let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
    const paramsA = {server:protocol_server,accion:"consulta_revision:"+table+":"+filter};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequestA);

    // end acceso

    // QUERY A ordenacion
    let info_geojson= await readDataFeatureRPG(table,filter+" order by codigo");
    console.log("info_geojson", info_geojson);
    jsonData = JSON.stringify(info_geojson);
    var html_QUERY_HEAD=`
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="download('${table}.geojson', 'text/plain')"><i class="fa fa-download"></i></button>
        <button style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Afegeix consulta a taula de contingut" OnClick="addLayerQueryRPG('${table}')"><i class="fa fa-plus-circle"></i></button>
      <TABLE id="table_queryRPG"   class="stripe row-border order-column" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
          <thead style="background-color:#e1eefb">
          <tr>
              <th>FID</td>
              <th>IDENTIF</td>   
              <th>CODI</td>  
              <th>DENOMINACIÓ</td> 
              <th>TIPOLOGIA</td>
              <th>COMPUTABLE</td>
              <th>GESTIÓ</td>
              <th>ESTAT</td>
              <th>EXT/PROP</td>
              <th>CALIFICIÓ SÓL RUSTIC</td>
              <th>CATEGORIA SÓL RUSTIC</td>
              <th>SUBCATEGORIA SÓL RUSTIC</td>
          </tr>
          </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

             if(info_geojson.features[n].properties.subcategoria==null)
                subcategoria="-"
             else
                subcategoria="("+info_geojson.features[n].properties.subcategoria+") - "+info_geojson.features[n].properties.subcate_de

             html_QUERY_ROWS=html_QUERY_ROWS+`

              <tr onclick="doActionRowRPG(this)">
                  <td>${info_geojson.features[n].properties.fid}</td>
                  <td>${info_geojson.features[n].properties.identif}</td>    
                  <td>${info_geojson.features[n].properties.codigo}</td>     
                  <td>${info_geojson.features[n].properties.denominaci}</td>
                  <td>${info_geojson.features[n].properties.tipologia}</td> 
                  <td>${info_geojson.features[n].properties.computable}</td>          
                  <td>${info_geojson.features[n].properties.gestion}</td>     
                  <td>${info_geojson.features[n].properties.estado}</td>  
                  <td>${info_geojson.features[n].properties.ext_prop}</td>  
                  <td>(${info_geojson.features[n].properties.califica}) - ${info_geojson.features[n].properties.calif_des}</td>
                  <td>(${info_geojson.features[n].properties.categorias}) - ${info_geojson.features[n].properties.cate_des}</td> 
                  <td>${subcategoria}</td>            
              </tr>`;
        }

    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";

    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

    formatQueryRPG();

    var elem = document.getElementById('divQUERY_RPG');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}



async function formatQueryRPG(){
    $(document).ready(function() {
        //$('#table_queryRPG').DataTable( {
          var dataTable=$('#table_queryRPG').removeAttr('width').DataTable( {
      //  $('#table_queryRPG').removeAttr('width').DataTable( {
            dom: 'Bfrtip',
            "buttons": [
                //'pageLength',
               
                //'colvis',
                'copy',
                'excel',
                //'csv',
                'pdf',
                'print'
                
                
            ],
           
            
            scrollY:  '43vh',
            scrollCollapse: true,
            "scrollX": true,
            paging: false,     
            padding:"3px",
            /*columnDefs: [
                { width: 500, targets: 1 }
              ],
            fixedColumns: true,*/
           
            language: {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Entradas",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Buscar:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
            },
        });

       
    } );
} 

async function addLayerQueryRPG(table){

    var filter="fid>0";

    var elem = document.getElementById('selectTablesRPG'); 
    if(elem!=null) tipo=elem.value;  
           
    console.log("tipo",tipo);

    if(tipo=="CAT"){

        filter="codigo<>'-'";

        elem = document.getElementById('selectPROT_CAT'); 
        if(elem!=null) prot_cat=elem.value;  

        if(prot_cat!="TOTS")
        filter=filter+" AND proteccion='"+prot_cat+"'";

    }

    if(tipo=="CAT_MOL"){

        filter="codigo<>'-'";

        elem = document.getElementById('selectPROT_CAT'); 
        if(elem!=null) prot_cat=elem.value;  

        if(prot_cat!="TOTS")
        filter=filter+" AND proteccion='"+prot_cat+"'";

    }

    if(tipo=="CH"){

        filter="codigo like 'N%' or codigo like 'R%'"

        elem = document.getElementById('selectCH'); 
        if(elem!=null) prot_cat=elem.value;  

        if(prot_cat!="TOTS")
        filter="codigo like '"+prot_cat+"%'";

    }

    if(tipo=="RSD"){

        filter="uso_global like '%Residencial%'";

        elem = document.getElementById('selectUSO_PRED'); 
        if(elem!=null) uso_pred=elem.value;  
        elem = document.getElementById('selectSIST_ORD'); 
        if(elem!=null) sist_ord=elem.value;  
        elem = document.getElementById('selectTIPO_EDIF'); 
        if(elem!=null) tipo_edif=elem.value;  
        elem = document.getElementById('selectZONA_RSD'); 
        if(elem!=null) zona=elem.value;  

        if(uso_pred!="TOTS")
        filter=filter+" AND uso_predominante='"+uso_pred+"'";
        if(sist_ord!="TOTS"){

            if(sist_ord=="AV") 
                filter=filter+" AND (tipo_edificacion='AV-MC.R.' OR tipo_edificacion='AV-MC.V.')";
            if(sist_ord=="RP") 
                filter=filter+" AND (tipo_edificacion='RP.S.' OR tipo_edificacion='RP.A.')";
            if(sist_ord=="VE") 
                filter=filter+" AND (tipo_edificacion='VE')";
        }
        if(tipo_edif!="TOTS")
            filter=filter+" AND tipo_edificacion='"+tipo_edif+"'";
        if(zona!="TOTS")
            filter=filter+" AND agrupacion='"+zona+"'";



    }

    if(tipo=="IND"){

        filter="uso_global like '%Industrial%'";

        elem = document.getElementById('selectZONA_IND'); 
        if(elem!=null) zona=elem.value;  

        if(zona!="TOTS")
        filter=filter+" AND agrupacion='"+zona+"'";

    }

    if(tipo=="TER"){

        filter="uso_global like '%Terciari%'";

        elem = document.getElementById('selectSIST_ORD'); 
        if(elem!=null) sist_ord=elem.value;  
        elem = document.getElementById('selectTIPO_EDIF'); 
        if(elem!=null) tipo_edif=elem.value;  
        elem = document.getElementById('selectZONA_TER'); 
        if(elem!=null) zona=elem.value;  

        if(sist_ord!="TOTS"){

            if(sist_ord=="AV") 
                filter=filter+" AND (tipo_edificacion='AV-MC.R.' OR tipo_edificacion='AV-MC.V.')";
            if(sist_ord=="RP") 
                filter=filter+" AND (tipo_edificacion='RP.S.' OR tipo_edificacion='RP.A.')";
            if(sist_ord=="VE") 
                filter=filter+" AND (tipo_edificacion='VE')";
        }
        if(tipo_edif!="TOTS")
            filter=filter+" AND tipo_edificacion='"+tipo_edif+"'";
        if(zona!="TOTS")
            filter=filter+" AND agrupacion='"+zona+"'";

    }

    if(tipo=="TUR"){

        filter="uso_global like '%Turístic%'";

        elem = document.getElementById('selectZONA_TUR'); 
        if(elem!=null) zona=elem.value;  

        if(zona!="TOTS")
            filter=filter+" AND agrupacion='"+zona+"'";

    }

    // sleq
    if(tipo=="SLEQ"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 
        elem = document.getElementById('selectORD'); 
        if(elem!=null) ordenacion=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
        if(ordenacion!="TOTS")
           filter=filter+" AND ordenacion='"+ordenacion+"'";
    
    }     

    // slel
    if(tipo=="SLEL"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectORD'); 
        if(elem!=null) ordenacion=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(ordenacion!="TOTS")
           filter=filter+" AND identificante='"+ordenacion+"'";
    
    }     

    if(tipo=="SGEC"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 
        elem = document.getElementById('selectORD'); 
        if(elem!=null) ordenacion=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
        if(ordenacion!="TOTS")
           filter=filter+" AND ordenacion='"+ordenacion+"'";
    
    }     

    if(tipo=="SGEL"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
    
    }  

    if(tipo=="SGC"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
    
    }    

    if(tipo=="SGIF"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
    
    }    

    if(tipo=="SGSU"){ 
     
        elem = document.getElementById('selectEP'); 
        if(elem!=null) ext_prop=elem.value;  
        elem = document.getElementById('selectDOM'); 
        if(elem!=null) dominio=elem.value; 
        elem = document.getElementById('selectDOT'); 
        if(elem!=null)  dotacional=elem.value; 

        if(ext_prop!="TOTS")
           filter=filter+" AND ext_prop='"+ext_prop+"'";
        if(dominio!="TOTS")
           filter=filter+" AND dominio='"+dominio+"'";
        if(dotacional!="TOTS")
           filter=filter+" AND uso_dotacional='"+dotacional+"'";
    
    }    

    // aanp

    if(tipo=="AANP"){

        filter="categoria='AANP'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectZONA'); 
        if(elem!=null) zona=elem.value;
        elem = document.getElementById('selectPROT'); 
        if(elem!=null) prot=elem.value;
        elem = document.getElementById('selectFPROT'); 
        if(elem!=null) fprot=elem.value;
        elem = document.getElementById('selectAANPTIPO'); 
        if(elem!=null) tipo_aanp=elem.value;

        if(subcategoria!="TOTS")
           filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(zona!="TOTS")
           filter=filter+" AND zona='"+zona+"'";
        if(prot!="TOTS")
           filter=filter+" AND plan_proteccion LIKE '%"+prot+"%'";
        if(fprot!="TOTS")
           filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%'";
        if(tipo_aanp!="TOTS")
           filter=filter+" AND tipo='"+tipo_aanp+"'";

     }

    if(tipo=="ANEI"){

        filter="categoria='ANEI'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectZONA'); 
        if(elem!=null) zona=elem.value;
        elem = document.getElementById('selectPROT'); 
        if(elem!=null) prot=elem.value;
        elem = document.getElementById('selectFPROT'); 
        if(elem!=null) fprot=elem.value;

        if(subcategoria!="TOTS")
           filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(zona!="TOTS")
           filter=filter+" AND zona='"+zona+"'";
        if(prot!="TOTS")
           filter=filter+" AND plan_proteccion LIKE '%"+prot+"%'";
        if(fprot!="TOTS")
           filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%'";

    }

    if(tipo=="AIN-PG"){

        filter="categoria='AIN'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectZONA'); 
        if(elem!=null) zona=elem.value;
        elem = document.getElementById('selectPROT'); 
        if(elem!=null) prot=elem.value;
        elem = document.getElementById('selectFPROT'); 
        if(elem!=null) fprot=elem.value;
        elem = document.getElementById('selectAINTIPO'); 
        if(elem!=null) tipo_aanp=elem.value;

        if(subcategoria!="TOTS")
           filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(zona!="TOTS")
           filter=filter+" AND zona='"+zona+"'";
        if(prot!="TOTS")
           filter=filter+" AND plan_proteccion LIKE '%"+prot+"%'";
        if(fprot!="TOTS")
           filter=filter+" AND figura_proteccion LIKE '%"+fprot+"%'";
        if(tipo_aanp!="TOTS")
           filter=filter+" AND tipo='"+tipo_aanp+"'";

    }

    if(tipo=="ARIP"){

        filter="categoria='ARIP'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";
       
    }

    if(tipo=="ZIP"){

        filter="categoria='ZIP'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";      

    }

    if(tipo=="APR"){

        filter="categoria='APR'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;
        elem = document.getElementById('selectAPRTIPO'); 
        if(elem!=null) tipo_apr=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";
        if(tipo_apr!="TOTS")
            filter=filter+" AND tipo='"+tipo_apr+"'";
       
    }

    if(tipo=="APT-C"){

        filter="categoria='APT-C'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";      

    }

      // AIA

      if(tipo=="AIA"){

        filter="categoria='AIA'";

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";      

    }

    // AT-H

    if(tipo=="AT-H"){

        filter="categoria='AT-H'";

    }

    // SRG

    if(tipo=="SRG"){

        filter="categoria='SRG'";

    }

    if(tipo=="NR"){

        filter="categoria='NR'";

    }

    if(tipo=="SRC"){

        elem = document.getElementById('selectSUBCATE'); 
        if(elem!=null) subcategoria=elem.value;

        if(subcategoria!="TOTS")
            filter=filter+" AND subcategoria='"+subcategoria+"'";
       
    }

    if(tipo=="SUB"){

        elem = document.getElementById('selectUSOS'); 
        if(elem!=null) usos=elem.value;

        if(usos!="TOTS")
            filter=filter+" AND uso='"+usos+"'";
       
    }

    if(tipo=="ZOU"){

        elem = document.getElementById('selectUSOS'); 
        if(elem!=null) usos=elem.value;

        if(usos!="TOTS")
            filter=filter+" AND uso='"+usos+"'";
       
    }

    
    if(tipo=="API"){

        elem = document.getElementById('selectTIPOS'); 
        if(elem!=null) tipos=elem.value;

        if(tipos!="TOTS")
            filter=filter+" AND normativa='"+tipos+"'";
       
    }


    if(tipo=="ATU"){

        elem = document.getElementById('selectTIPOS'); 
        if(elem!=null) tipos=elem.value;

        if(tipos!="TOTS")
            filter=filter+" AND tipo='"+tipos+"'";
       
    }

    /*if(tipo=="SGEC"){

        elem = document.getElementById('selectGESTION'); 
        if(elem!=null) gestion=elem.value;

        if(gestion!="TOTS")
            filter=filter+" AND gestion='"+gestion+"'";

        elem = document.getElementById('selectESTADO'); 
        if(elem!=null) estado=elem.value;
    
        if(estado!="TOTS")
            filter=filter+" AND estado='"+estado+"'";
       
    }*/

    if(tipo=="SGSI"){

        elem = document.getElementById('selectGESTION'); 
        if(elem!=null) gestion=elem.value;

        if(gestion!="TOTS")
            filter=filter+" AND gestion='"+gestion+"'";

        elem = document.getElementById('selectESTADO'); 
        if(elem!=null) estado=elem.value;
    
        if(estado!="TOTS")
            filter=filter+" AND estado='"+estado+"'";
       
    }

    /*if(tipo=="SGEL"){

        elem = document.getElementById('selectGESTION'); 
        if(elem!=null) gestion=elem.value;

        if(gestion!="TOTS")
            filter=filter+" AND gestion='"+gestion+"'";

        elem = document.getElementById('selectESTADO'); 
        if(elem!=null) estado=elem.value;
    
        if(estado!="TOTS")
            filter=filter+" AND estado='"+estado+"'";

        elem = document.getElementById('selectTIPOLOGIA'); 
        if(elem!=null) tipologia=elem.value;
        
        if(tipologia!="TOTS")
            filter=filter+" AND tipologia='"+tipologia+"'";

        elem = document.getElementById('selectCOMPUTABLE'); 
        if(elem!=null) computable=elem.value;
            
        if(computable!="TOTS")
            filter=filter+" AND computable='"+computable+"'";
        
        elem = document.getElementById('selectEXT_PROP'); 
        if(elem!=null) ext_prop=elem.value;
            
        if(ext_prop!="TOTS")
            filter=filter+" AND ext_prop='"+ext_prop+"'";

        elem = document.getElementById('selectCALIF_SR'); 
        if(elem!=null) calif_sr=elem.value;
                
        if(calif_sr!="TOTS")
            filter=filter+" AND califica='"+calif_sr+"'";

        elem = document.getElementById('selectCATEG_SR'); 
        if(elem!=null) categ_sr=elem.value;
                    
        if(categ_sr!="TOTS")
            filter=filter+" AND categorias='"+categ_sr+"'";

        elem = document.getElementById('selectSUBCATEG_SR'); 
        if(elem!=null) subcateg_sr=elem.value;
                        
        if(subcateg_sr!="TOTS")
            filter=filter+" AND subcate='"+subcateg_sr+"'";
       
    }*/
             
    console.log("filter="+filter);
    let info_geojson= await readDataFeatureRPG(table,filter);

   /* layerQuery=L.geoJSON(info_geojson, {

        weight:1,
               
    }); */

    color= getRandomColor();
      //  color= rainbow(listLayers.length,n);

        layerQuery=L.geoJSON(info_geojson, {
    
           // weight:1,
            fillColor:  color, 
                weight: 1, 
                opacity: 1, 
                color: 'black', 
              //  dashArray: '2,8', 
                fillOpacity: 0.8
                   
        });

   // appearanceControl._addLayer(layerQuery,tipo+" - "+filter,true, false);
   // appearanceControl._update();

    // add layer to consultas toc

    var idN=layersMapConsultas.length+1;
    var node = { id:idN,text:tipo+" - "+filter};
    layersMapConsultas.push([idN,layerQuery]);
    layerQuery.addTo(map);
    var nodeP = $('#jstree_consultas').jstree().get_node("99"); 
    $('#jstree_consultas').jstree().create_node( nodeP, node, 'last');
    $('#jstree_consultas').jstree().check_node( node);
   


}

        async function doActionRowRPG(object){

            

            console.log("seleccionado=",object.value);

            const cellsOfRow = object.getElementsByTagName('td');

            console.log("row=",cellsOfRow[0].innerHTML.toLowerCase());

            var fid=cellsOfRow[0].innerHTML.toLowerCase();

            var elem = document.getElementById('selectTablesRPG'); 
            var tipo=elem.value; 
            console.log("tipo="+tipo)
            var tabla="";

            switch(tipo){
                case "CAT":
                    tabla="catalogos"
                  
                    break   
                case "CAT_MOL":
                    tabla="catalogos_molinos"
                      
                    break   
                case "CH":
                    tabla="calific_zonas"
                    break   
                case "r":
                    tabla="preservacion"
                    break   
                case "RSD":
                    tabla="vm_calificaciones_zonas"
                   
                    break   
                case "IND":
                    tabla="vm_calificaciones_zonas"
                
                    break 
                case "TER":
                    tabla="vm_calificaciones_zonas"
                 
                    break   
                case "TUR":
                    tabla="vm_calificaciones_zonas"
                 
                    break 

                case "AANP":
                    tabla="suelo_rustico";
                    break;
                case "ANEI":
                    tabla="suelo_rustico";
                    break;
                case "AIN":
                    tabla="suelo_rustico";
                    break;
                case "ARIP":
                    tabla="suelo_rustico";
                    break;
                case "ZIP":
                    tabla="suelo_rustico";
                    break;
                case "APR":
                    tabla="suelo_rustico";
                    break;
                case "APT":
                    tabla="suelo_rustico";
                    break;
                case "AIA":
                    tabla="suelo_rustico";
                    break;
                case "AT-H":
                    tabla="suelo_rustico";
                    break;
                case "SRG":
                    tabla="suelo_rustico";
                    break;
                case "SRC":
                    tabla="suelo_rustico";
                    break;
                case "NR":
                    tabla="suelo_rustico";
                    break;
                case "SUB":
                    tabla="suelo_urbanizable";
                    break;
                case "ZOU":
                    tabla="zou";
                    break;
                case "API":
                    tabla="api_rev";
                    break;
                case "ATU":
                    tabla="atu_su";
                    break;
                case "SLEQ":
                    tabla="v_sistema_local_equipamientos_cat";
                    break;
                case "SLEL":
                    tabla="v_sistema_local_espacios_libres_cat";
                    break;
                case "SGIF":
                    tabla="v_sistema_general_infraestructuras_cat";
                    break;
                case "SLC":
                    tabla="sistema_local_comunicaciones";
                    break;
                case "SLIF":
                    tabla="sistema_local_infraestructuras";
                    break;
                case "SLSU":
                    tabla="sistema_local_servicios_urbanos";
                    break;
                case "SGEC":
                    tabla="v_sistema_general_equipamientos_cat";
                    break;
                case "SGEL":
                    tabla="v_sistema_general_espacios_libres_cat";
                    break;
                case "SGC":
                    tabla="v_sistema_general_comunicaciones_cat";
                    break;
                case "SGIF":
                    tabla="v_sistema_general_infraestructuras_cat";
                    break;
                case "SGSU":
                    tabla="v_sistema_general_servicios_urbanos_cat";
                    break;
              
            }

              // QUERY A ordenacion

            console.log("tabla="+tabla+", "+fid);
            let info_geojson= await readDataFeatureRPG(tabla,"fid="+fid);
            
            var bbox = turf.bbox(info_geojson.features[0].geometry);
            var polyBBOX = turf.bboxPolygon(bbox);
          
            var coordsB = turf.getCoords(polyBBOX);
            var coords = []; 
            coords[0]=[coordsB[0][0][1],coordsB[0][0][0]];
            coords[1]=[coordsB[0][1][1],coordsB[0][1][0]];
            coords[2]=[coordsB[0][2][1],coordsB[0][2][0]];
            coords[3]=[coordsB[0][3][1],coordsB[0][3][0]];
          
            var poly = L.polygon(
               coords 
                );

            if(isMobile())
                sidebar.close('queryTables');

            map.fitBounds(poly.getBounds());
           // map.setZoom(map.getZoom()-1);
            
            if(puntos!=null) map.removeLayer(puntos);  
            puntos = L.geoJSON(info_geojson, { style: style });  
            
            map.addLayer(puntos);

            // escribir acceso

            let urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
            const paramsA = {server:protocol_server,accion:"localizar:"+tabla};
                Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
                const dataRequestA = {
                    method: 'GET'
                }; 
            await fetch(urlA,dataRequestA);

            // end acceso


        }
