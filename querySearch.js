async function contentSEARCH(){

    var divSEARCH=`<div id="divSEARCH" style='background-color:#f2f2f2;width:100%;height:70%'></div`;

    var divOptionsSEARCH=`<div id="divOptionsSEARCH" style='background-color:#f2f2f2;width:100%'></div`;

    // Diseño SEARCH DIALOG
    html="";
    html=html+`<div style='overflow: auto;padding:20px;background-color:#f2f2f2;border-style: solid;border-width:0pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:90%;top:10px;left:10px'>
                <LABEL style='padding:5px;font-size:8.5pt;font-family:Arial Black;background-color:#fdfde0;color:#1a4d1a;box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);border-style: solid;border-width:0.1pt;border-color:black;width:380px;height:20px;'>CERCA DIRECCIÓ / REF. CADASTRAL</LABEL><BR><BR>   
                   
                ${divOptionsSEARCH}
               <BR><BR> 
                ${divSEARCH}
                
               
                <BR>   
                </div>`;

   

    var elem = document.getElementById('searchDir');   
    elem.innerHTML=html;  
    setOptionsSEARCH();
}

async function setOptionsSEARCH(){

    html=`
    <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
           
       
        <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>NOMBRE</label></td>
            <td><input type="text" onkeyup='changeSEARCH()' style="width:100%" id="nameSearch" name="nameSearch" ></td>      
        </tr>
        <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>NUMERO</label></td>
            <td><input type="text" onkeyup='changeSEARCH()' style="width:100%" id="numSearch" name="numSearch" ></td>      
        </tr>
        <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>REF. CADASTRAL</label></td>
            <td><input type="text" onkeyup='changeSEARCH()' style="width:100%" id="refSearch" name="refSearch" ></td>      
        </tr>
        <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>ILLA/POLIGON (SU=5 DIG, RU=3 DIG)</label></td>
            <td><input type="text" onkeyup='changeSEARCH()' style="width:100%" id="manzanaSearch" name="manzanaSearch" ></td>      
        </tr>
        <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>PARCELA (SU=2 DIG, RU=5 DIG)</label></td>
            <td><input type="text" onkeyup='changeSEARCH()' style="width:100%" id="parcelaSearch" name="parcelaSearch" ></td>      
        </tr>
           
    </TABLE>`;
  

    var elem = document.getElementById('divOptionsSEARCH');   
     

    elem.innerHTML=html;
    
    changeSEARCH();

}

async function changeSEARCH(){

    manzana=""
    parcela=""

    var elem = document.getElementById('nameSearch'); 
    if(elem!=null) name=elem.value; 
    var elem = document.getElementById('numSearch'); 
    if(elem!=null) num=elem.value; 
    var elem = document.getElementById('refSearch'); 
    if(elem!=null) ref=elem.value; 
    var elem = document.getElementById('manzanaSearch'); 
    if(elem!=null) manzana=elem.value; 
    var elem = document.getElementById('parcelaSearch'); 
    if(elem!=null) parcela=elem.value; 
    console.log(name);

    var table="parcela_su_ru_calles";
    var filter="fid>0";

    name=name.toUpperCase();

    if(name!=""){
        filter=filter+" and (upper(calle) like '%"+name+"%')"; 

    } 

   if(name!="" && num!="")
        filter=filter+" and numero="+num; 

    if(ref!="")
        filter=filter+" and refcat like'"+ref+"%'"; 

    if(manzana!="")
        filter=filter+" and masa like'"+manzana+"%'"; 
    
    if(parcela!="")
        filter=filter+" and parcela like'"+parcela+"%'"; 

    filter=filter+" limit 200";

    if(name=="" && num=="" && ref=="" && manzana=="" && parcela=="") filter="fid=0";

     querySEARCH(table,filter);

}

 async function querySEARCH(table,filter){

      // QUERY A ordenacion

    console.log("filter pasa!!!!!!", filter);
    let info_geojson= await readDataFeatureRPG(table,filter);
    console.log("filter pasa2!!!!!!");
    console.log("info_geojson", info_geojson);
    var html_QUERY_HEAD=`
        
         <TABLE id="table_queryS"  class="display" style="padding:3px;font-size:8pt;font-family:Arial;width:100%">
            <thead style="background-color:#e1eefb">
            <tr>
                <th>TIPO VIA</td>
                <th>NOMBRE</td>
                <th>NUMERO</td>
                
                <th>REF. CADASTRAL</td>
                
            </tr>
            </thead>`;

    html_QUERY_ROWS="<tbody>";        

    if(info_geojson.features!=null)
        for(var n=0;n< info_geojson.features.length;n++){

            html_QUERY_ROWS=html_QUERY_ROWS+`

                <tr onclick="doActionRowREF(this)">
                    <td>${info_geojson.features[n].properties.tipo_via}</td>
                    <td>${info_geojson.features[n].properties.calle }</td>
                    <td>${info_geojson.features[n].properties.numero }</td>
                   
                    <td>${info_geojson.features[n].properties.refcat}</td>
                          
                </tr>`;
        }
  
    html_QUERY_ROWS=html_QUERY_ROWS+"</tbody>";
 
    html_QUERY=html_QUERY_HEAD+html_QUERY_ROWS+`</TABLE>`;

   formatQueryS();

    var elem = document.getElementById('divSEARCH');   
    console.log(elem.style.height);
    elem.style.height="70%";
    elem.innerHTML=html_QUERY; 

}

async function formatQueryS()
        {

             $(document).ready(function() {
                $('#table_queryS').removeAttr('width').DataTable( {
                     scrollY:  '50vh',
                     scrollCollapse: true,
                    "scrollX": true,
                    paging:         false,
                 
                    padding:"3px",
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

        async function doActionRowREF(object){

            console.log("seleccionado=",object.value);

            const cellsOfRow = object.getElementsByTagName('td');

            console.log("row=",cellsOfRow[0].innerHTML.toLowerCase());

            var ref=cellsOfRow[3].innerHTML;

            
              // QUERY A ordenacion
            let info_geojson= await readDataFeatureRPG("parcela_su_ru","refcat='"+ref+"'");
            
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

            sidebar.close('queryTables');

            map.fitBounds(poly.getBounds());
           // map.setZoom(map.getZoom()-1);
            
            if(puntos!=null) map.removeLayer(puntos);  
            puntos = L.geoJSON(info_geojson, { style: style });  
            
            map.addLayer(puntos);


        }