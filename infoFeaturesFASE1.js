async function infoFeaturesFASE1(e){

    //  escribir acceso

    urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user");
    const params = {accion:"info_features_revision", latlng:e.latlng, lat:e.latlng.lat, lng:e.latlng.lng, x:x=e.latlng.utm().x, y:y=e.latlng.utm().y};
        Object.keys(params).forEach(key => urlA.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        }; 
    await fetch(urlA,dataRequest);

    // end escribir acceso
   

    map.spin(true);

    var x=e.latlng.utm().x
    var y=e.latlng.utm().y
    console.log(x+","+y);
          
    var arrayTablas = new Array(27); 
    arrayTablas[0]=["parcela_su_ru_calles"];
    arrayTablas[1]=["calific_zonas"];
    arrayTablas[2]=["suelo_rustico"];
    arrayTablas[3]=["sistema_local_equipamientos"];
    arrayTablas[4]=["sistema_local_espacios_libres"];
    arrayTablas[5]=["sistema_local_comunicaciones"];
    arrayTablas[6]=["sistema_local_infraestructuras"];
    arrayTablas[7]=["sistema_local_servicios_urbanos"];
    arrayTablas[8]=["sistema_general_equipamientos"];
    arrayTablas[9]=["sistema_general_espacios_libres"];
    arrayTablas[10]=["sistema_general_comunicaciones"];
    arrayTablas[11]=["sistema_general_infraestructuras"];
    arrayTablas[12]=["sistema_general_servicios_urbanos"];
    arrayTablas[13]=["espacios_libres_privados"];
    arrayTablas[14]=["catalogos"];
    arrayTablas[15]=["catalogos_molinos"];
    arrayTablas[16]=["preservacion"];
    arrayTablas[17]=["actuaciones_transformacion_urbana"];
    arrayTablas[18]=["area_planeamiento_incorporado"];
    arrayTablas[19]=["zona_regulacion_especifica"];
    //arrayTablas[20]=["pb_pla_especial"];
    //arrayTablas[21]=["pbx_pla_especial_ri"];
    //arrayTablas[22]=["pc_pla_parcial"];
    //arrayTablas[23]=["pe_estudi_detall"];
    arrayTablas[20]=["suelo_urbanizable"];
    arrayTablas[21]=["nucleos_tradicionales"];
    arrayTablas[22]=["uso_turistico"];
    arrayTablas[23]=["parque_agrario"];
    arrayTablas[24]=["suelo_urbano"];
    arrayTablas[25]=["apt_rustico"];
    arrayTablas[26]=["areas_prevencion_riesgos"];

    var num_exp=0;

  /*  arrayTablas[1]=["sistema_local_infraestructuras"];
    arrayTablas[2]=["sistema_local_espacios_libres"];
    arrayTablas[3]=["sistema_locales_equipamientos"];
    arrayTablas[4]=["sistema_locales_espacioslibres_publicos"];
    arrayTablas[5]=["aanp"];
    arrayTablas[6]=["ain"];
    arrayTablas[7]=["anei"];
    arrayTablas[8]=["arip"];
    arrayTablas[9]=["zrp_pg"];
    arrayTablas[10]=["suelo_rustico_comun"];
    arrayTablas[11]=["nucleos_rurales"];
    arrayTablas[12]=["calific_zonas"];
    arrayTablas[13]=["suelo_urbanizable"];
   // arrayTablas[14]=["zou"];
    arrayTablas[14]=["aru"];
    arrayTablas[15]=["aru_rc"];
    arrayTablas[16]=["aru_t"];
    arrayTablas[17]=["ari_cmu"];
    arrayTablas[18]=["arg"];
    arrayTablas[19]=["rustico"];
    arrayTablas[20]=["rustico_apr"];
    arrayTablas[21]=["rustico_apt"];
    arrayTablas[22]=["parques_agrarios"];
    arrayTablas[23]=["sl_el_estructurantes"];
    arrayTablas[24]=["api_rev"];
    arrayTablas[25]=["campos_golf"];*/

   
    
   
    var tabla;

    console.log("passsssssssssaaaaaaaaaaa");
    
    var htmlr="";
    var html="";
    // function servicio(){
    for(var p=0;p<arrayTablas.length;p++){

         tabla=arrayTablas[p]; 
         console.log("paix"+tabla);

       // let url = new URL("http://"+serverPath+"/infoXY");
        let url = new URL("http://"+serverPath+"/opg/infoXY_FASE1");
        const params = {tabla: tabla, x: x, y: y};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        var response = await fetch(url,dataRequest);
        // console.log(response);
        var geojsonRES = await response.json();
       
      
        try{
            
            // console.log(tabla);
            console.log(geojsonRES.features);

            if(geojsonRES.features.length>0) 
                 
                if(tabla=="sistema_local_equipamientos"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,152,246,0.2);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2"> EQUIPAMENTS COMUNITARIS</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA LOCAL)</td>                   
                                    </tr>
                                `; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/SLEQ/"+
                        geojsonRES.features[r].properties.codigo+".pdf"

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identificacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SLEQ')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                       
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_local_equipamientos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Normativa</i></button>
                                        </td>  
                                    </tr>
                                `;
                    
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                if(tabla=="sistema_local_espacios_libres"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(190,207,80,0.7);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2"> ESPAI LLIURE PÚBLIC</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA LOCAL)</td>                   
                                    </tr>
                                `; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identificacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        
                                        <td colspan="2"> 
                                             <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SLEL')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                       
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_local_espacios_libres','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                        </td>  
                                    </tr>
                                `;
                    
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                if(tabla=="sistema_local_comunicaciones"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,152,246,0.2);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">COMUNICACIONS</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA LOCAL)</td>                   
                                    </tr>
                                `; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistemas_locales_comunicaciones','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button></td>  
                                    </tr>
                                `;
                    
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                if(tabla=="sistema_local_infraestructuras"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,123,137,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">INFRAESTRUCTURES</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA LOCAL)</td>                   
                                    </tr>
                                `; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_local_infraestructuras','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button></td>  
                                    </tr>
                                `;
                    
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                if(tabla=="sistema_local_servicios_urbanos"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,123,137,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">SERVEIS URBANS</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA LOCAL)</td>                   
                                    </tr>
                                `; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_local_servicios_urbano','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button></td>  
                                    </tr>
                                `;
                    
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                

                if(tabla=="sistema_general_equipamientos"){

                    var tipo_sg="EQUIPAMENTS COMUNITARIS"

                    

                    for(var r=0;r<geojsonRES.features.length;r++){  
                        

                        htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,152,246,0.2);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">${tipo_sg}</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA GENERAL)</td>                   
                                    </tr>
                                   `; 

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identificacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SGEQ')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                       
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_general_equipamientos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                        </td>  
                                    </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                if(tabla=="sistema_general_comunicaciones"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0x;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,123,137,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2"> COMUNICACIONS</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA GENERAL)</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                    </tr>
                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identificacion}</td>                  
                    </tr>
                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo} (${area})</td>                  
                    </tr>
                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td colspan="2"> 
                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SGC')"><i class="fa fa-info-circle"> Fitxa</i></button>
                           
                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_general_comunicaciones','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i>
                        </button></td>  
                    </tr>
                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                } 

                if(tabla=="sistema_general_infraestructuras"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0x;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,123,137,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">INFRAESTRUCTURES</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA GENERAL)</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                    </tr>
                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identificacion}</td>                  
                    </tr>
                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo} (${area})</td>                  
                    </tr>
                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td colspan="2"> 
                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SGIF')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                       
                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_general_infraestructuras','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                        </td>  
                    </tr>
                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                } 

                if(tabla=="sistema_general_servicios_urbanos"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0x;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(121,123,137,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">SERVEIS URBANS</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA GENERAL)</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                    </tr>
                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identificacion}</td>                  
                    </tr>
                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo} (${area})</td>                  
                    </tr>
                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                        <td colspan="2"> 
                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SGSU')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                       
                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_general_servicios_urbanos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                        </td>  
                    </tr>
                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                } 

                if(tabla=="sistema_general_espacios_libres"){
                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(190,207,80,0.7);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">ESPAIS LLIURES</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA GENERAL)</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo} (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_RPG(this,'SGEL')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                       
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('sistema_general_espacios_libres','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                        </td>  
                                    </tr>
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                } 

                if(tabla=="espacios_libres_privados"){

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(190,207,80,0.7);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2"> ESPAI LLIURE PRIVAT</td>                   
                                    </tr >
                                  
                                `; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        htmlr=htmlr+`
                                    
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.ordenacion}  (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('espacios_libres_privados','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button></td>  
                                    </tr>
                                `;
                    
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 

                
                if(tabla=="catalogos"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(230,143,230,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">CATALEGS</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/CATALOGOS/"+
                                    geojsonRES.features[r].properties.codigo+".pdf"

                        botonFicha=''
                        if(geojsonRES.features[r].properties.codigo!='-') botonFicha=`<a href="${ruta}" target="_blank" class="ui-button ui-widget ui-corner-all" title="Fitxa aprobada"><i class="fa fa-info-circle"> Fitxa </i></a>`

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.proteccion+"/"+
                            geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${codigo}   (${area})</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        ${botonFicha}
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('catalogos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

                if(tabla=="catalogos_molinos"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(230,143,230,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">CATALEGS (MOLÍ)</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/CATALOGOS/"+
                        geojsonRES.features[r].properties.codigo+".pdf"


                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.proteccion+"/"+
                            geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${codigo}   (${area})</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <a href="${ruta}" target="_blank" class="ui-button ui-widget ui-corner-all" title="Fitxa aprobada"><i class="fa fa-info-circle"> Fitxa </i></a> 
                                      
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revsion('catalogos_molinos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

                if(tabla=="preservacion"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(204,128,51,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">PRESERVACIÓ (r)</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` 
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${codigo} </td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                          <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('preservacion','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

                if(tabla=="actuaciones_transformacion_urbana"){

                    console.log("pasa0 aru")

                    htmlr=htmlr+`<TABLE  style='margin-top: 0x;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(158,0,0,0.7);padding:3px;font-size:8.5pt;font-family:Arial Black;color:white;height:22px'>
                                        <td colspan="2">ACTUACIÓ TRANSFORMACIÓ</td>                   
                                    </tr >`;
                                     
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        var tipo=""

                        console.log("pasa1 aru")

                        var ruta=""
                        switch(geojsonRES.features[r].properties.tipo_tyc){

                            case "ARU":
                            case "ARU-AE":
                              
                                ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/ARU/"+
                                    geojsonRES.features[r].properties.tipo_tyc+"_"+
                                    geojsonRES.features[r].properties.codigo+".pdf"


                                tipo="(ARU) Actuacions de renovació urbana"
                               
                                break;
                            case "ARU-T":
                                ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/ARU-T/"+
                                    geojsonRES.features[r].properties.tipo_tyc+"_"+
                                    geojsonRES.features[r].properties.codigo+".pdf"
                                tipo="(ARU-T) Actuacions de renovació urbana Transitòries"
                                break;
                            case "ARI-PE":
                                ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/ARI-PE/"+
                                    geojsonRES.features[r].properties.tipo_tyc+"_"+
                                    geojsonRES.features[r].properties.codigo+".pdf"
                                tipo="(ARI-PE) Actuacions de reforma interior"
                                break;
                            case "AT-IU":
                            case "AT-IU-PE":
                            case "AT-IU-T":
                                ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/ARU-T/"+
                                    geojsonRES.features[r].properties.tipo_tyc+"_"+
                                    geojsonRES.features[r].properties.codigo+".pdf"
                                tipo="(AT-IU) Actuacions de transformació amb finalitats d’integració urbana i millora ambiental (DT 11 LUIB)"
                                break;
                            case "AA":
                            case "AA-T":
                                ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/AA/"+
                                    geojsonRES.features[r].properties.tipo_tyc+"_"+
                                    geojsonRES.features[r].properties.codigo+".pdf"
                                tipo="(AA) Actuacions aïllades en sòl urbà"
                                break;
                            case "AD":
                                ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/AD/"+
                                    geojsonRES.features[r].properties.tipo_tyc+"_"+
                                    geojsonRES.features[r].properties.codigo+".pdf"
                                tipo="(AD)  Actuacions de dotació vinculades a increments d’aprofitament"
                                break;
                            
                            default:
                                
                                break;

                        }
                        console.log("pasa2 aru")
                        htmlr=htmlr+`<tr align="center"  style='background-color:white;padding:3px;font-size:8pt;font-family:Arial Black;color:grey;height:22px'>
                                        <td colspan="2">${tipo}</td>                   
                                    </tr>`

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>ACTUACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.actuacion}</td>                  
                                    </tr>
                                   
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo_completo} (${area})</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> 
                                            <a href="${ruta}" target="_blank" class="ui-button ui-widget ui-corner-all" title="Fitxa aprobada"><i class="fa fa-info-circle"> Fitxa </i></a> 
             
                                           <!-- <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa Planejament"  OnClick="ficha_ARU_RPG('${geojsonRES.features[r].properties.codigo_completo}')"><i class="fa fa-info-circle"> Fitxa</i></button> -->    
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('actuaciones_transformacion_urbana','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                        </td>  
                                    </tr>
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                } 

               

                if(tabla=="suelo_urbanizable"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,179,102,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:white;height:22px'>
                                    <td colspan="2">(SUB) SUELO URBANIZABLE</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var ruta="http://vscenegis.hopto.org/images/FICHAS_PLANEAMIENTO/ACTUACIONES/SUB/"+
                                  geojsonRES.features[r].properties.codigo+".pdf"

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` 

                                <tr align="center"  style='background-color:white;padding:3px;font-size:8pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">${geojsonRES.features[r].properties.titulo}</td>                   
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>SUB/${codigo} </td>                  
                                </tr>
                               
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <a href="${ruta}" target="_blank" class="ui-button ui-widget ui-corner-all" title="Fitxa aprobada"><i class="fa fa-info-circle"> Fitxa </i></a>
             
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('suelo_urbanizable','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      //  <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.regulacion} </td>         
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

                if(tabla=="area_planeamiento_incorporado"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(77,128,77,0.8);padding:3px;font-size:8.5pt;font-family:Arial Black;color:white;height:22px'>
                                    <td colspan="2">(API) AREA PLANEJAMENT INCORPORAT</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/"+
                                  geojsonRES.features[r].properties.ruta_exp

                        var datoRuta=`<td align="center"><a href="${ruta}"  target="_blank" title="Informació del instrument de desenvolupament" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.regulacion}</a></td>`                  
                        
                        if(geojsonRES.features[r].properties.ruta_exp==null)
                            datoRuta=`<td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.regulacion}</td> `

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` 

                                <tr align="center"  style='background-color:white;padding:3px;font-size:8pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">${geojsonRES.features[r].properties.denominacion}</td>                   
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>API/${codigo} </td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>REGULACIÓ</LABEL></td>  
                                    ${datoRuta}
                                            
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                          <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('area_planeamiento_incorporado','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      //  <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.regulacion} </td>         
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

                

                if(tabla=="zona_regulacion_especifica"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(77,128,77,0.8);padding:3px;font-size:8.5pt;font-family:Arial Black;color:white;height:22px'>
                                    <td colspan="2">(ZRE) ZONA REGULACIÓ ESPECÍFICA</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){  
                        
                       

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` 

                                <tr align="center"  style='background-color:white;padding:3px;font-size:8pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">${geojsonRES.features[r].properties.denominacion}</td>                   
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>ZRE/${codigo} </td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                          <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('zona_regulacion_especifica','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

                if(tabla=="nucleos_tradicionales"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(77,128,77,0.8);padding:3px;font-size:8.5pt;font-family:Arial Black;color:white;height:22px'>
                                    <td colspan="2">(NT) NUCLIS TRADICIONALS</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){  
                        
                       

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` 

                                <tr align="center"  style='background-color:white;padding:3px;font-size:8pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">${geojsonRES.features[r].properties.denominacion}</td>                   
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${codigo} </td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                          <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('nucleos_tradicionales','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }


                if(tabla=="suelo_rustico"){

                   
                    for(var r=0;r<geojsonRES.features.length;r++){  

                        var back_color="213,180,60,0.5";
                        var calificacion=geojsonRES.features[r].properties.subcategoria;
                        var calif_desc=geojsonRES.features[r].properties.subcategoria_descripcion;
                        var descr="";
                        var color="#4d4d4d"
                        switch(geojsonRES.features[r].properties.categoria){

                            case "AANP":
                                back_color="0,117,33,0.75";
                                color="white"
                                descr="Sòl Rústic Protegit"
                                break;
                            case "ANEI":
                                back_color="73,105,52,0.75";
                                color="white"
                                descr="Sòl Rústic Protegit"
                                break;
                            case "AIN":
                                back_color="151,176,74,0.75";
                                descr="Sòl Rústic Protegit"
                                break;
                            case "ARIP":
                                back_color="128,166,108,0.75";
                                descr="Sòl Rústic Protegit"
                                break;
                            case "ZIP":
                                back_color="231,170,150,0.75";
                                descr="Sòl Rústic Protegit"
                                break;
                            case "APR":
                                back_color="255,185,120,0.9";
                                descr="Sòl Rústic Protegit (subjacent)"
                                break;
                            case "APT-C":
                                back_color="224,219,159,0.75";
                                descr="Sòl Rústic Protegit (subjacent)"
                                break;
                            case "AIA":
                                back_color="224,219,159,0.75";
                                descr="Sòl Rústic Comú"
                                break;
                            case "AT-H":
                                back_color="212,185,153,0.75";
                                descr="Sòl Rústic Comú"
                                calificacion=geojsonRES.features[r].properties.categoria;
                                calif_desc=geojsonRES.features[r].properties.categoria_descripcion;
                                break;
                            case "SRG":
                                back_color="242,242,194,0.75";
                                descr="Sòl Rústic Comú"
                                calificacion=geojsonRES.features[r].properties.categoria;
                                calif_desc=geojsonRES.features[r].properties.categoria_descripcion;
                                break;
                            case "NR":
                                back_color="115,101,77,0.75";
                                calificacion=geojsonRES.features[r].properties.denominacion;
                                calif_desc=geojsonRES.features[r].properties.denominacion_descripcion;
                                color="white"
                                descr="Nucli Rural"
                                break;
                            default:
                                back_color="213,180,60,0.5";
                                break;

                        }
                        
                        htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                        <tr  align="center"  style='background-color:rgb(${back_color});color:${color};padding:3px;font-size:8.5pt;font-family:Arial Black;height:22px'>
                            <td colspan="2">(${geojsonRES.features[r].properties.categoria}) ${geojsonRES.features[r].properties.categoria_descripcion}</td>                   
                        </tr >
                        <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                            <td colspan="2">${descr}</td>                   
                        </tr>`; 

                        if(geojsonRES.features[r].properties.denom_desc!="-" && geojsonRES.features[r].properties.denom_desc!=null){

                            htmlr=htmlr+`<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                       
                                        <td  colspan="2"><LABEL style='font-size:8pt;font-family:Arial black;color:GREY'>${geojsonRES.features[r].properties.denom_desc}</td>                  
                                    </tr>

                            `;
                        }

                        if(geojsonRES.features[r].properties.tipo_descr!="-" && geojsonRES.features[r].properties.tipo_descr!=null){

                            htmlr=htmlr+`<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                       
                                        <td  colspan="2"><LABEL style='font-size:8pt;font-family:Arial black;color:GREY'>(${geojsonRES.features[r].properties.tipo_descr})</td>                  
                                    </tr>

                            `;
                        }

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${calificacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${calif_desc}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('suelo_rustico','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 

                if(tabla=="parque_agrario"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(232,255,223,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">${geojsonRES.features[r].properties.subcategoria_descripcion}</td>                   
                                    </tr>
                                   `; 

                        htmlr=htmlr+` 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('parque_agrario','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                  
                } 

                if(tabla=="areas_prevencion_riesgos"){

                   
                    for(var r=0;r<geojsonRES.features.length;r++){  

                        var back_color="213,180,60,0.5";
                        var calificacion=geojsonRES.features[r].properties.subcategoria;
                        var calif_desc=geojsonRES.features[r].properties.subcategoria_descripcion;
                        var descr="";
                        var color="#4d4d4d"
                        switch(geojsonRES.features[r].properties.subcategoria){

                            case "APR-IN_G":
                            case "APR-IN_T500":
                                back_color="0,117,33,0.75";
                                color="white"
                                descr="Sòl Rústic Protegit"
                                break;
                            case "APR-IF":
                                back_color="73,105,52,0.75";
                                color="white"
                                descr="Sòl Rústic Protegit"
                                break;
                            case "APR-ER":
                                back_color="151,176,74,0.75";
                                descr="Sòl Rústic Protegit"
                                break;
                            case "APR-ES":
                                back_color="128,166,108,0.75";
                                descr="Sòl Rústic Protegit"
                                break;
                            case "APR-CN":
                                back_color="231,170,150,0.75";
                                descr="Sòl Rústic Protegit"
                                break;
                           
                            default:
                                back_color="213,180,60,0.5";
                                break;

                        }
                        
                        htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                        <tr  align="center"  style='background-color:rgb(${back_color});color:${color};padding:3px;font-size:8.5pt;font-family:Arial Black;height:22px'>
                            <td colspan="2">(${geojsonRES.features[r].properties.categoria}) ${geojsonRES.features[r].properties.categoria_descripcion}</td>                   
                        </tr >
                        <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                            <td colspan="2">${descr}</td>                   
                        </tr>`; 

                        if(geojsonRES.features[r].properties.denom_desc!="-" && geojsonRES.features[r].properties.denom_desc!=null){

                            htmlr=htmlr+`<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                       
                                        <td  colspan="2"><LABEL style='font-size:8pt;font-family:Arial black;color:GREY'>${geojsonRES.features[r].properties.denom_desc}</td>                  
                                    </tr>

                            `;
                        }

                        /*if(geojsonRES.features[r].properties.tipo_descr!="-" && geojsonRES.features[r].properties.tipo_descr!=null){

                            htmlr=htmlr+`<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                       
                                        <td  colspan="2"><LABEL style='font-size:8pt;font-family:Arial black;color:GREY'>(${geojsonRES.features[r].properties.tipo_descr})</td>                  
                                    </tr>

                            `;
                        } */

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>SUBCATEGORIA</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${calificacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${calif_desc}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('areas_prevencion_riesgos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 

                if(tabla=="apt_rustico"){
                    

                    for(var r=0;r<geojsonRES.features.length;r++){  

                        bgcolor="#cce6ff"
                        if(geojsonRES.features[r].properties.subcategoria=="APT-C") bgcolor="#e6e6e6"
                        

                        htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:${bgcolor};padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td >${geojsonRES.features[r].properties.subcategoria} - ${geojsonRES.features[r].properties.subcategoria_descripcion} </td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('apt_rustico','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                        </td>            
                                    </tr>
                                   `; 
                     
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                } 


                if(tabla=="suelo_urbano"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:#e6e6e6;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('suelo_urbano','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Normativa Comú en Sol Urbà</i></button></td>  
                                              
                                    </tr>
                                   `; 

                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                  
                } 


                if(tabla=="calific_zonas"){

                   
                    for(var r=0;r<geojsonRES.features.length;r++){  

                        var back_color="213,180,60,0.5";
                        var tipo_zona="RESIDENCIAL"
                        
                        switch(geojsonRES.features[r].properties.agrupacion){

                            
                            case "A":
                            case "B":
                            case "C":
                            case "D":
                            case "E":
                            case "G":
                            case "H":
                            case "K":
                                back_color="234,207,195,0.9";
                                tipo_zona="RESIDENCIAL PLURIFAMILIAR"
                                break;
                            case "I":
                            case "J":
                                back_color="255,255,204,1";
                                tipo_zona="RESIDENCIAL UNIFAMILIAR"
                                break;
                            case "L":
                            case "M":
                                back_color="148,146,247,0.9";
                                tipo_zona="SECUNDARIO"
                                break;
                            case "S":
                            case "T":
                                back_color="114,155,111,0.5";
                                tipo_zona="TERCIARIO"
                                break;
                            case "N":
                            case "R":
                                back_color="255,230,204,0.9";
                                tipo_zona="ZONA CENTRO HISTORICO"
                                break;
                            case "D-PL":
                                back_color="255,148,127,0.5";
                                tipo_zona="RESIDENCIAL ENTRE MITGERES"
                                break;
                            case "E-Pl":
                                back_color="255,181,146,0.5";
                                tipo_zona="HABITATGE PLURIFAMILIAR AILLAT"
                                break;
                            case "I-Pl":
                                back_color="255,220,91,0.5";
                                tipo_zona="HABITATGE UNIFAMILIAR"
                                break;
                            case "S-Pl":
                                back_color="140,78,198,0.5";
                                tipo_zona="COMERCIAL I SERVEIS"
                                break;
                            case "T-Pl":
                                back_color="41,148,255,0.5";
                                tipo_zona="TURISTIC"
                                break;
                            case "TH-Pl":
                                back_color="117,181,255,0.5";
                                tipo_zona="TURISTIC HOTELER"
                                break;
                            case "VA-Pl":
                                back_color="255,200,90,0.5";
                                tipo_zona="HABITATGE UNIFAMILIAR ADOSSAT"
                                break;
                            case "VT-Pl":
                                back_color="255,133,155,0.5";
                                tipo_zona="HABITATGE TRADICIONAL"
                                break;
                            
                            default:
                                back_color="213,180,60,0.3";
                                break;

                        }

                        botonFicha=''
                        if(geojsonRES.features[r].properties.codigo_vol!='SL1-L' &&
                                geojsonRES.features[r].properties.codigo_vol!='SL2-L' &&
                                geojsonRES.features[r].properties.codigo_vol!='SL3-L' &&
                                geojsonRES.features[r].properties.codigo_vol!='SL4-L' &&
                                geojsonRES.features[r].properties.codigo_vol!='E-L' &&
                                geojsonRES.features[r].properties.codigo_vol!='B-L' &&
                                geojsonRES.features[r].properties.codigo_vol!='F0a-L' &&
                                geojsonRES.features[r].properties.agrupacion!='N' &&
                                geojsonRES.features[r].properties.agrupacion!='R'){
                            botonFicha=`<button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo_vol} OnClick="fichaCALIFICACION_RPG('${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                            `
                        }    
                        
                        htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                       
                        <thead  align="center"  style='background-color:rgb(${back_color});padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                            <td colspan="2">${tipo_zona}</td>                   
                        </thead >`; 

                       

                        htmlr=htmlr+`
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo_vol}</td>                  
                                    </tr>
                                   
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                    
                                        <td colspan="2"> 
                                            ${botonFicha}
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('calific_zonas','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                        </td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 

                if(tabla=="uso_turistico"){

                    htmlr=htmlr+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(204,230,255,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">ÚS TÚRISTIC (PIAT)</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){  
                        
                       

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        htmlr=htmlr+` 

                                <tr align="center"  style='background-color:white;padding:3px;font-size:8pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">${geojsonRES.features[r].properties.zona}</td>                   
                                </tr>
                               
                               
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                          <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('uso_turistico','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle">Normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    htmlr=htmlr+`</TABLE><br>`;

                   
                }

               
                if(tabla=="pb_pla_especial"){

                    
                    console.log("passssssaaa pa_especial")
                    if(num_exp==0){

                        htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;
                    }

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PB-PLA_ESPECIAL/PB-"+
                                  geojsonRES.features[r].properties.codigo+"/PB-"+
                                 geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";     
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PB - PLA ESPECIAL</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }
                   

                  
                 }
                 if(tabla=="pbx_pla_especial_ri"){

                    if(num_exp==0){

                        htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;
                    } 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PBX_PERIS/PBX-"+
                            geojsonRES.features[r].properties.codigo+"/PBX-"+
                            geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";   
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PBX - PERIS</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"><LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }
                  

                 } 
                 if(tabla=="pc_pla_parcial"){

                    if(num_exp==0){

                        htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;
                    } 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PC-PLA_PARCIAL/PC-"+
                        //var ruta="http://vscenegis.hopto.org/joomla/images/sampledata/planoguia/Images Arxiu/PC-PLA_PARCIAL/PC-"+
                                  geojsonRES.features[r].properties.codigo+"/PC-"+
                                 geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";        
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PC - PLA PARCIAL</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }

                   
                 } 
                 if(tabla=="pe_estudi_detall"){


                    if(num_exp==0){

                        htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;
                    } 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) htmlr=htmlr+` <tr style='height:2px'>                 
                                        </tr>`;

                         var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PE-ESTUDI_DETALL/PE-"+
                                  geojsonRES.features[r].properties.codigo+"/PE-"+
                                 geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";    
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PE - ESTUDI DETALL</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"><LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }

                   
                 } 


                 if(tabla=="parcela_su_ru_calles"){

                    

                    map.spin(false);

                    htmlr=htmlr+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(26,77,26,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">SITUACIÓ</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var centroid = turf.centroid(geojsonRES.features[r].geometry);
                        var coord=turf.getCoord(centroid.geometry)
                        var urlG = "http://maps.google.com/?cbll=" + coord[1] + "," + coord[0] + "&cbp=12,90,0,0,5&layer=c";

                        var calle=geojsonRES.features[r].properties.tipo_via+" "+geojsonRES.features[r].properties.calle+" "+geojsonRES.features[r].properties.numero;

                        htmlr=htmlr+` 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td> 
                                            <a target="_blank" title="Ir Sede electronica catastro" href="https://www1.sedecatastro.gob.es/cycbieninmueble/OVCListaBienes.aspx?RC1=${geojsonRES.features[r].properties.pcat1}&RC2=${geojsonRES.features[r].properties.pcat2}"><img src="http://${serverPath}/opg/images/sede_catastro1.png"></a>
                                        </td> 
                                        <td> 
                                            <a target="_blank" title="Ir a Street view" href="${urlG}}"><img src="http://${serverPath}/opg/images/streetview.png"></a>
                                        </td>  
                                        
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>REF. CADASTRAL</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.refcat}</LABEL></td>  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        
                                        <td COLSPAN="2"><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${calle}</td>                  
                                    </tr>
                                    
                                `;
                    }
                    htmlr=htmlr+`</TABLE><br>`;
                    
                    
                  
                }

                

               

                /*if(tabla=="aanp"){

                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(213,180,60,0.5);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(AANP) Àrees naturals d'especial interès d'alt nivell de protecció</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SRP) SÓL RÚSTIC PROTEGIT</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcate}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcat_des}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('aanp','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 
                if(tabla=="ain"){

                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(247,179,31,0.6);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(AIN-PG) Àrees d'interès Natural per planejament general</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SRP) SÓL RÚSTIC PROTEGIT</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcate}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcat_des}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('ain','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 
                if(tabla=="anei"){

                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(114,155,111,0.5);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(ANEI) Àrees naturals d'especial interès</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SRP) SÓL RÚSTIC PROTEGIT</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcate}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcat_des}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('anei','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                } 
                if(tabla=="arip"){

                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: -5px;margin-right: -5px;margin-left: -10px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(6,192,131,0.4);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(ARIP) Àrees Rurals d'interès paisatgístic vincules a la LEN i el PTIM</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SRP) SÓL RÚSTIC PROTEGIT</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcate}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcat_des}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('arip','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                    
                } 
                if(tabla=="zrp_pg"){

                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(231,170,150,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(ZPRP-PG) Zones de paisatge rural protegida per planejament general</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SRP) SÓL RÚSTIC PROTEGIT</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcate}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcat_des}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('zrp_pg','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                    
                } 
                if(tabla=="suelo_rustico_comun"){

                   
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(194,171,163,0.8);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(${geojsonRES.features[r].properties.categoria}) ${geojsonRES.features[r].properties.cate_des}</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SRP) SÓL RÚSTIC COMÚ</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcate}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DESCRIPCIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.subcat_des}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('suelo_rustico_comun','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                   
                  
                } 
                
                if(tabla=="nucleos_rurales"){

                    htmlr=htmlr+`<TABLE style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: -10px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7"  BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(116,168,116,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(SRC-NR) Sòl Rústic categoria de Nucli Rural</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SR) SÓL RÚSTIC</td>                   
                                    </tr>`; 
                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DENOMINACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('nucleos_rurales','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                    
                } */

               /* if(tabla=="suelo_urbanizable"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(209,173,125,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(SUB) SÓL URBANITZABLE</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">${geojsonRES.features[r].properties.uso}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DENOMINACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.titulo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('suelo_urbanizable','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                    
                   
                } 
                if(tabla=="zou"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var color;
                        if(geojsonRES.features[r].properties.uso=="RESIDENCIAL") color="rgb(240,218,218,0.9)"
                        if(geojsonRES.features[r].properties.uso=="INDUSTRIAL") color="rgb(178,177,216,1)"
                        if(geojsonRES.features[r].properties.uso=="TERCIARIA") color="rgb(210,163,241,1)"
                        if(geojsonRES.features[r].properties.uso=="TURISTICO") color="rgb(120,192,255,1)"
                        if(geojsonRES.features[r].properties.uso=="R/T") color="rgb(246,204,203,1)"

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:${color};padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2">(ZOU) ZONA ORDENACIÓ URBANISTICA</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">${geojsonRES.features[r].properties.calificaci}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>ÚS</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.uso}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('zou','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                    
                } 

                if(tabla=="aru"){


                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(237,245,255,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ACTUACION DE RENOVACIÓN URBANA (ARU)</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">AREA DE REPARTO ${geojsonRES.features[r].properties.area_reparto}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>ARU-${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>SITUACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.nombre}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('aru','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 

                if(tabla=="aru_rc"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(237,245,255,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ACTUACION DE RENOVACIÓN URBANA (ARU/RC)</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">AREA DE REPARTO ${geojsonRES.features[r].properties.area_reparto}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>SITUACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.nombre}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('aru_rc','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                   
                    
                } 
                if(tabla=="aru_t"){


                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(237,245,255,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ACTUACION DE RENOVACIÓN URBANA TRANSITORIA (ARU-T)</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">AREA DE REPARTO ${geojsonRES.features[r].properties.area_reparto}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'ARU-T-${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>SITUACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.nombre}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('aru_t','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                } 
                if(tabla=="ari_cmu"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(237,245,255,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ACTUACION DE REFORMA INTERIOR (ARI-CMU)</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">AREA DE REPARTO ${geojsonRES.features[r].properties.area_reparto}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>ARI-CMU-${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>SITUACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.nombre}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('ari_cmu','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                    
                } 
                if(tabla=="arg"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(237,245,255,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ACTUACIÓ PREFERENT DE REGENERACIÓ URBANA (ARG)</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">AREA DE REPARTO ${geojsonRES.features[r].properties.area_reparto}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>SITUACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.nombre}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('arg','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;
                }

                   
                    
                if(tabla=="api_rev"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(232,255,223,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ÀMBITS DE PLANEJAMENT (DERIVAT) INCORPORAT (API)</td>                   
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial;color:grey;height:22px'>
                                        <td colspan="2" style='text-align: justify'>${geojsonRES.features[r].properties.tipo_api}</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DENOMINACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacio}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('api_rev','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                    
                } 

                if(tabla=="parques_agrarios"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(232,255,223,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">${geojsonRES.features[r].properties.zona}</td>                   
                                    </tr>
                                   `; 

                        htmlr=htmlr+` 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('parques_agrarios','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                  
                } 

                if(tabla=="sl_el_estructurantes"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(118,249,129,0.9);padding:3px;font-size:8pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">ESPACIO LIBRE S. LOCAL ESTRUCTURANTE</td>                   
                                    </tr>
                                   `; 

                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                  
                } 

                if(tabla=="campos_golf"){

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        htmlr=htmlr+`<TABLE style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(251,214,119,0.9);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'  >
                                        <td colspan="2">Altres instal·lacions d'interès social i d'activitats econòmiques d'interès general en sòl rústic</td>                   
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">CAMPS DE GOLF</td>                   
                                    </tr>`; 

                        htmlr=htmlr+` 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DENOMINACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2"> <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa_revision('campos_golf','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button></td>  
                                    </tr>
                                   
                                `;
                    }
                    htmlr=htmlr+`</TABLE><BR>`;

                   
                }  */
                
                
             }catch( err ) {
                 //content[n]=""
                console.log("No hay"+arrayTablas[p]);
             }   

        }

      //  if(html!="") html="<LABEL style='font-size:10.0pt;font-family:Arial Black;color:#003300;width:272px;height:25px'><u>REVISIÓ PLÀ GENERAL FASE1</u><BR></LABEL><BR>"+html;
  
        var htmlTableREV="";
       /* if(html!="")
        htmlTableREV=`<TABLE style='padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="blue" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
       

        <tr align="left" bgcolor="white" style='padding:3px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td>
                <div  style='padding:15px;font-size:8pt;font-family:Arial;color:#000000;'>${html}
                </div>
            </td>
           
        </tr>
        
    </TABLE>`; */

    if(htmlr!="")
    htmlTableREV=`<div align="center" style='padding:0px;font-size:8pt;font-family:Arial;color:#000000;'>${htmlr}
                </div>
                `;

  

 /* 
    arrayTablas = new Array(46); 
    arrayTablas[0]=["slocal_equipamientos"];
    arrayTablas[1]=["sgeneral_equipamientos"];
    arrayTablas[2]=["slocal_espacioslibres_publicos"];
    arrayTablas[3]=["sgeneral_espacioslibres"];
    arrayTablas[4]=["slocal_comunicaciones_infraestructuras"];
    arrayTablas[5]=["sgeneral_comunicaciones_infraestructuras"];
    arrayTablas[6]=["zona_residencial_1"];
    arrayTablas[7]=["zona_secundaria"];
    arrayTablas[8]=["zona_terciaria"];
    arrayTablas[9]=["zonasf"];
    arrayTablas[10]=["catalogos"];
    arrayTablas[11]=["catalogos_actualizacion"];
    arrayTablas[12]=["zonas_centro_historico"];
    arrayTablas[13]=["api"];
    arrayTablas[14]=["area_regimen_especial"];
    arrayTablas[15]=["unidad_ejecucion"];
    arrayTablas[16]=["suelo_urbanizable_programado"];
    arrayTablas[17]=["suelo_urbanizable_no_programado"];
    arrayTablas[18]=["srg_dot"];
    arrayTablas[19]=["aia_dot"];
    arrayTablas[20]=["apt_dot"];
    arrayTablas[21]=["at_dot"];
    arrayTablas[22]=["aanp"];
    arrayTablas[23]=["anei"];
    arrayTablas[24]=["area_rural_interes_paisajistico"];
    arrayTablas[25]=["aapi_dot"];
    arrayTablas[26]=["zre"];
    arrayTablas[27]=["suelo_rustico"];
    arrayTablas[28]=["pri_zona_residencial_entre_mitgeres"];
    arrayTablas[29]=["pri_zona_habitatge_edificacio_oberta"];
    arrayTablas[30]=["pri_zona_habitatge_tradicional"];
    arrayTablas[31]=["pri_zona_habitatges_adossats"];
    arrayTablas[32]=["pri_zona_habitatge_unifamiliar_aillat"];
    arrayTablas[33]=["pri_zona_comercial_serveis"];
    arrayTablas[34]=["pri_zona_turistica"];
    arrayTablas[35]=["pri_zona_turistica_hotelera"];
    arrayTablas[36]=["pri_equipamientos"];
    arrayTablas[37]=["pri_sistema_espais_lliures_publics"];
    arrayTablas[38]=["pri_unitat_actuacio"];
    arrayTablas[39]=["pri_corredor_paisajistic"];
    arrayTablas[40]=["pri_catalogos"];
    arrayTablas[41]=["parcela_su_ru_calles"];
    arrayTablas[42]=["pb_pla_especial"];
    arrayTablas[43]=["pbx_pla_especial_ri"];
    arrayTablas[44]=["pc_pla_parcial"];
    arrayTablas[45]=["pe_estudi_detall"];

    var num_exp=0;
  

        html="";
    // function servicio(){
    for(var p=0;p<arrayTablas.length;p++){

         tabla=arrayTablas[p]; 
         console.log("paix"+tabla);

       // let url = new URL("http://"+serverPath+"/infoXY");
        let url = new URL("http://"+serverPath+"/infoXY");
        const params = {tabla: tabla, x: x, y: y};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        var response = await fetch(url,dataRequest);
        // console.log(response);
        var geojsonRES = await response.json();
       
      
        try{
            
            // console.log(tabla);
            console.log(geojsonRES.features);

            if(geojsonRES.features.length>0) 
                 

            if(tabla=="slocal_equipamientos"){

                html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(162,209,238,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2"> EQUIPAMENTS COMUNITARIS</td>                   
                                </tr >
                                <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">(SISTEMA LOCAL)</td>                   
                                </tr>`; 

                for(var r=0;r<geojsonRES.features.length;r++){   

                    html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_PG(this,'SLEQ')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('slocal_equipamientos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;
   
            } 

            if(tabla=="sgeneral_equipamientos"){

                html=html+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                    <tr  align="center"  style='background-color:rgb(148,173,198,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                        <td colspan="2"> EQUIPAMENTS COMUNITARIS</td>                   
                                    </tr >
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td colspan="2">(SISTEMA GENERAL)</td>                   
                                    </tr>`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_PG(this,'SGEQ')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('sgeneral_equipamientos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                        </td>      
                                    </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;


            }  
            if(tabla=="slocal_espacioslibres_publicos"){

                html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(156,253,129,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">ESPAIS LLIURES PÚBLICS</td>                   
                                </tr >
                                <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">(SISTEMA LOCAL)</td>                   
                                </tr>`; 

                for(var r=0;r<geojsonRES.features.length;r++){   

                    html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_PG(this,'SLEL')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('slocal_espacioslibres_publicos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;

            }   
            if(tabla=="sgeneral_espacioslibres"){

                html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(75,191,75,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">ESPAIS LLIURES</td>                   
                                </tr >
                                <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">(SISTEMA GENERAL)</td>                   
                                </tr>`; 

                for(var r=0;r<geojsonRES.features.length;r++){   

                    html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_PG(this,'SGEL')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('sgeneral_espacioslibres','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;

                
            }  
            if(tabla=="slocal_comunicaciones_infraestructuras"){

                html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(168,191,213,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">COMUNICACIONS E INFRAESTRUCTURES</td>                   
                                </tr >
                                <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">(SISTEMA LOCAL)</td>                   
                                </tr>`; 

                for(var r=0;r<geojsonRES.features.length;r++){   

                    html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_PG(this,'SLCI')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('slocal_comunicaciones_infraestructuras','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;

               
            }  
            if(tabla=="sgeneral_comunicaciones_infraestructuras"){

                html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(168,191,213,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">COMUNICACIONS E INFRAESTRUCTURES</td>                   
                                </tr >
                                <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td colspan="2">(SISTEMA GENERAL)</td>                   
                                </tr>`; 

                for(var r=0;r<geojsonRES.features.length;r++){   

                    html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>IDENTIFICANT</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.identif}</td>                  
                                </tr>
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSISTEMAS_PG(this,'SGCI')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('sgeneral_comunicaciones_infraestructuras','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;

               
                }  

                if(tabla=="zona_residencial_1"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(252,204,213,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">RESIDENCIAL</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>`;

                        if(geojsonRES.features[r].properties.condiciones==null || geojsonRES.features[r].properties.condiciones==""){
                            html=html+`<tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PG(this,'${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('zona_residencial_1','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                        }else{
                            html=html+`<tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                            <td colspan="2"> 
                                                <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PG(this,'${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                            </td>      
                                        </tr>`;

                        }
                      
                    }
                    html=html+`</TABLE><br>`;

                   
                }  
                if(tabla=="zona_secundaria"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(188,168,207,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">SECUNDARI</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PG(this,'${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('zona_secundaria','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;
                   
                }  
                if(tabla=="zona_terciaria"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,187,255,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">TERCIARI</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PG(this,'${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('zona_terciaria','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                 if(tabla=="zonasf"){


                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(215,239,239,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">VOLUMETRIA ESPECIFICA</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_VE(this,'${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('zonasf','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="zonas_centro_historico"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(213,168,147,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">N/R (CENTRO HISTORICO)</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                       <!-- <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_VE(this,'${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button> -->
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('zonas_centro_historico','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                    
                } 
                if(tabla=="catalogos"){

                    html=html+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(230,143,230,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">CATALOGOS</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var area = turf.area(geojsonRES.features[r].geometry);
                        area=area.toFixed(2)+ " m2";

                        codigo=geojsonRES.features[r].properties.proteccion+"/"+
                            geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${codigo}   (${area})</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaCAT(this)"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('catalogos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;

                   
                }
                if(tabla=="catalogos_actualizacion"){


                    html=html+`<TABLE  style='margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(230,143,230,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">CATALOGOS</td>                   
                                </tr >`;
                              

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        codigo=geojsonRES.features[r].properties.proteccion+"/"+
                            geojsonRES.features[r].properties.codigo

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                </tr>
                               
                                <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaCAT_ACT(this)"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('catalogos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                      
                    }
                    html=html+`</TABLE><br>`;


                }
                if(tabla=="api"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(232,255,223,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(API) AREA PLANEAMIENTO INCORPORADO</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>API/${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaAPI(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('api','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                   
                }
                if(tabla=="area_regimen_especial"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(237,245,255,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(ARE) AREA REGIMEN ESPECIAL</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>ARE/${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaARE(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('area_regimen_especial','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                     
                   
                }
                if(tabla=="unidad_ejecucion"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:red;padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">(UE) UNIDAT DE EJECUCIÓ</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var recepcionado="NO EXECUTADA"
                        var colorR="#ffb9b9"
                        if(geojsonRES.features[r].properties.recepcionat!="-"){
                             recepcionado="EXECUTADA"
                             colorR="#bcffb9"
                        }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.titulo}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:${colorR};padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td  colspan=2><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${recepcionado}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaUE(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('unidad_ejecucion','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                        </td>      
                                    </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                }
                if(tabla=="suelo_urbanizable_no_programado"){


                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(165,206,206,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(SUNP) SOL URBANITZABLE NO PROGRAMAT</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var recepcionado="NO RECEPCIONAT"
                        var colorR="#ffb9b9"
                        if(geojsonRES.features[r].properties.recepcionado){
                             recepcionado="RECEPCIONAT"
                             colorR="#bcffb9"
                        }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominaci}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>SUNP/${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:${colorR};padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td  colspan=2><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${recepcionado}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSUNP(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('suelo_urbanizable_no_programado','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                        </td>      
                                    </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                    
                   
                }
                if(tabla=="suelo_urbanizable_programado"){

                    

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(165,206,206,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(SUP) SOL URBANITZABLE PROGRAMAT</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var recepcionado="NO RECEPCIONAT"
                        var colorR="#ffb9b9"
                        if(geojsonRES.features[r].properties.recepcionado){
                             recepcionado="RECEPCIONAT"
                             colorR="#bcffb9"
                        }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.titulo}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>SUP/${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:${colorR};padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td  colspan=2><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${recepcionado}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaSUP(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('suelo_urbanizable_programado','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                        </td>      
                                    </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                   
                }
                if(tabla=="srg_dot"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,255,201,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">SOL RUSTIC GENERAL</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('srg_dot','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                    
                } 
                if(tabla=="aia_dot"){

                     html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(237,224,202,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(AIA) AREA DE INTERES AGRARIO</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('aia_dot','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="apt_dot"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(220,188,136,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(APT) AREA DE PROTECC. TERRITORIAL</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('apt_dot','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="at_dot"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(252,219,142,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(AT) AREA DE TRANSICIÓ</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('at_dot','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="aanp"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(150,189,111,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(AANP) Áreas Naturales de Especial Interes de Alt Nivel de Protecció</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('aanp','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="anei"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(189,189,135,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(ANEI) Áreas Naturales de Especial Interés</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('anei','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                    
                } 
                if(tabla=="area_rural_interes_paisajistico"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(189,189,135,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(ARIP) Áreas Rurals de Interés Paisajístic</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.ptm_cat}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('area_rural_interes_paisajistico','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="aapi_dot"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(189,189,135,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(AAPI) Áreas de Assentament dins el Paisatje de Interés</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.categ}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('aapi_dot','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="zre"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(228,188,93,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">(ZRE) Zona Regim Especial en SR</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DENOMINACIÓ
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.nom_estand}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('zre','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 

                if(tabla=="suelo_rustico"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(228,188,93,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">Zubzonas S. Rústico con caracter General</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>ZONA
                                        </LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.text}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('suelo_rustico','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="pri_zona_residencial_entre_mitgeres"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,186,173,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">RESIDENCIAL ENTRE MITGERES</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_EM')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_residencial_entre_mitgeres','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                     
                } 
                if(tabla=="pri_zona_habitatge_edificacio_oberta"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,224,209,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">HABITATGE EDIFiCACIÓ OBERTA</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_EO')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_habitatge_edificacio_oberta','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="pri_zona_habitatge_tradicional"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,157,175,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">HABITATGE TRADICIONAL</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_TRAD')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_habitatge_tradicional','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="pri_zona_habitatges_adossats"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(255,221,154,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">HABITATGE ADOSSAT</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                         <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_habitatges_adossats','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="pri_zona_habitatge_unifamiliar_aillat"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(248,233,178,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">HABITATGE UNIFAMILIAR AILLAT</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_UA')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_habitatge_unifamiliar_aillat','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="pri_zona_comercial_serveis"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(190,168,211,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">COMERCIAL SERVEIS</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_COM')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_comercial_serveis','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="pri_zona_turistica"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(165,210,255,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">TURISTIC</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_T')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_turistica','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                } 
                if(tabla=="pri_zona_turistica_hotelera"){
                    
                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(110,169,231,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                                    <td colspan="2">TURISTIC HOTELER</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                    <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                </tr>
                                <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEDIFICACION_PRI(this,'PRI_TH')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                        <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_zona_turistica_hotelera','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                    </td>      
                                </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                } 
                if(tabla=="pri_equipamientos"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                    <tr  align="center"  style='background-color:rgb(177,215,238,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                        <td colspan="2">EQUIPAMENTS COMUNITARIS</td>                   
                    </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){  
                        tipo_sistema="(SERVEI TECNIC)";
                        if(geojsonRES.features[r].properties.tipo_sistema=="SL") tipo_sistema="(SISTEMA LOCAL)";
                        if(geojsonRES.features[r].properties.tipo_sistema=="SG") tipo_sistema="(SISTEMA GENERAL)";

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'> 
                                        <td COLSPAN="2"><LABEL style='font-size:7.5pt;font-family:Arial Black;color:#660000'>${tipo_sistema}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>DENOMINACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEQ_PRI(this,'SLEQ','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_equipamientos','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                        </td>      
                                    </tr>
                                    `;
                    

                    }
                    html=html+`</TABLE><br>`;
                    
                    
                    
                } 
                if(tabla=="pri_sistema_espais_lliures_publics"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                    <tr  align="center"  style='background-color:rgb(128,219,103,1);padding:3px;font-size:8.5pt;font-family:Arial Black;color:#4d4d4d;height:22px'>
                        <td colspan="2">ESPAI LLIURE PUBLIC</td>                   
                    </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){  
                        tipo_sistema="";
                        if(geojsonRES.features[r].properties.tipo_sistema=="SL") tipo_sistema="(SISTEMA LOCAL)";
                        if(geojsonRES.features[r].properties.tipo_sistema=="SG") tipo_sistema="(SISTEMA GENERAL)";

                        html=html+` <tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'> 
                                        <td COLSPAN="2"><LABEL style='font-size:7.5pt;font-family:Arial Black;color:#660000'>${tipo_sistema}</td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CODI</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa parametres y condicions de edificació" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaEQ_PRI(this,'EL','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Fitxa</i></button>
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativaPRI('pri_sistema_espais_lliures_publics','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button>
                                        </td>      
                                    </tr>
                                    `;
                    

                    }
                    html=html+`</TABLE><br>`;
                    
                   
                  
                } 

                if(tabla=="pri_unitat_actuacio"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(153,8,8,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">(UE) UNIDAT DE EJECUCIÓ</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacio}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaUA_PRI(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                           <!-- <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('unidad_ejecucion','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button> -->
                                        </td>      
                                    </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;
                    
                 
                  
                } 
                if(tabla=="pri_corredor_paisajistic"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(104,180,83,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">(CP) CORREDOR PAISAJISTIC</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaPRI_CP(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                           <!-- <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('unidad_ejecucion','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button> -->
                                        </td>      
                                    </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;
                    
                 
                  
                } 

                if(tabla=="pri_catalogos"){

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(230,143,230,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:#4d4d4d;height:22px'>
                                    <td colspan="2">CATALOGOS</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>NOMBRE</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.denominacion}</td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>CALIFICACIÓ</LABEL></td>  
                                        <td><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${geojsonRES.features[r].properties.codigo}</td>                  
                                    </tr>
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"> 
                                            <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Fitxa del element" value=${geojsonRES.features[r].properties.codigo} OnClick="fichaCAT_PRI(this)"><i class="fa fa-info-circle"> Fitxa</i></button> 
                                           <!-- <button style="padding:3px;font-size:9pt;font-family:Arial Black" class="ui-button ui-widget ui-corner-all" title="Informació normativa associada" OnClick="normativa('unidad_ejecucion','${geojsonRES.features[r].properties.fid}')"><i class="fa fa-info-circle"> Articles normativa</i></button> -->
                                        </td>      
                                    </tr>
                                `;
                    }
                    html=html+`</TABLE><br>`;

                   
                }


                if(tabla=="parcela_su_ru_calles"){

                    map.spin(false);

                    html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(26,77,26,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">UNITATS CADASTRALS</td>                   
                                </tr >`; 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        var calle=geojsonRES.features[r].properties.tipo_via+" "+geojsonRES.features[r].properties.calle+" "+geojsonRES.features[r].properties.numero;

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>MANZANA</LABEL></td>  
                                        <td><button style="padding:3px;font-size:8.5pt;font-family:Arial" class="ui-button ui-widget ui-corner-all" title="informació urbanística de la illa cadastral" value=${geojsonRES.features[r].properties.masa} OnClick="fichaManzana(this)">${geojsonRES.features[r].properties.masa}</button> </td>                  
                                    </tr> 
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PARCELA</LABEL></td>  
                                        <td><button style="padding:3px;font-size:8.5pt;font-family:Arial" class="ui-button ui-widget ui-corner-all" title="informació urbanística de la parcel.la cadastral" value=${geojsonRES.features[r].properties.refcat} OnClick="fichaParcela(this)">${geojsonRES.features[r].properties.refcat}</button> </td>                  
                                    </tr>
                                    <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        
                                        <td COLSPAN="2"><LABEL style='font-size:8pt;font-family:Arial;color:BLACK'>${calle}</td>                  
                                    </tr>
                                    
                                `;
                    }
                    html=html+`</TABLE><br>`;
                    
                    
                  
                }

               
                if(tabla=="pb_pla_especial"){

                    

                    if(num_exp==0){

                        html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        html=html+` <tr style='height:2px'>                 
                                        </tr>`;
                    }

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PB-PLA_ESPECIAL/PB-"+
                                  geojsonRES.features[r].properties.codigo+"/PB-"+
                                 geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";     
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PB - PLA ESPECIAL</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }
                   

                  
                 }
                 if(tabla=="pbx_pla_especial_ri"){

                    if(num_exp==0){

                        html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        html=html+` <tr style='height:2px'>                 
                                        </tr>`;
                    } 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PBX_PERIS/PBX-"+
                            geojsonRES.features[r].properties.codigo+"/PBX-"+
                            geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";   
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PBX - PERIS</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"><LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }
                  

                 } 
                 if(tabla=="pc_pla_parcial"){

                    if(num_exp==0){

                        html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        html=html+` <tr style='height:2px'>                 
                                        </tr>`;
                    } 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                        var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PC-PLA_PARCIAL/PC-"+
                        //var ruta="http://vscenegis.hopto.org/joomla/images/sampledata/planoguia/Images Arxiu/PC-PLA_PARCIAL/PC-"+
                                  geojsonRES.features[r].properties.codigo+"/PC-"+
                                 geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";        
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PC - PLA PARCIAL</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                    <td colspan="2"> 
                                        <LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }

                   
                 } 
                 if(tabla=="pe_estudi_detall"){


                    if(num_exp==0){

                        html=html+`<TABLE  style='margin-top: 0px;margin-bottom: 0px;margin-right: 0px;margin-left: 0px;padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:50px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
                                <tr  align="center"  style='background-color:rgb(102,102,102,1);padding:3px;font-size:8.5pt;font-family:Arial BLACK;color:white;height:22px'>
                                    <td colspan="2">INSTRUMENTS DE DESENVOLUPAMENT</td>                   
                                </tr >`; 

                        num_exp++;
                    }else{

                        html=html+` <tr style='height:2px'>                 
                                        </tr>`;
                    } 

                    for(var r=0;r<geojsonRES.features.length;r++){   

                        if(r>0) html=html+` <tr style='height:2px'>                 
                                        </tr>`;

                         var ruta="http://vscenegis.hopto.org/images/planoguia/Images Arxiu/PE-ESTUDI_DETALL/PE-"+
                                  geojsonRES.features[r].properties.codigo+"/PE-"+
                                 geojsonRES.features[r].properties.codigo+"_PORTADA.pdf";    
                                 
                           var colorAplicable="GREEN";
                           var msgAplicable="";
                           if(geojsonRES.features[r].properties.aplicable=="SI"){
                               colorAplicable="#1a4d1a";
                               msgAplicable="ACTUALMENT APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="NO"){
                               colorAplicable="#990000";
                               msgAplicable="ACTUALMENT NO APLICABLE";
                           }
                           if(geojsonRES.features[r].properties.aplicable=="D"){
                               colorAplicable="GREY";
                               msgAplicable="-----------------------";;
                           }

                        html=html+` <tr align="left"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                        <td><LABEL style='font-size:8pt;font-family:Arial Black;color:BLACK'>PE - ESTUDI DETALL</LABEL></td>  
                                        <td align="center"><a href="${ruta}"  target="_blank" title="Informació del expedient" style='color:blue;font-family:Arial;font-size:8.5pt'>${geojsonRES.features[r].properties.codigo}</a></td>                  
                                    </tr> 
                                    <tr align="center"  style='background-color:white;padding:3px;font-size:8.5pt;font-family:Arial Black;color:#660000;height:22px'>  
                                        <td colspan="2"><LABEL style='text-align: justify;font-size:8.5pt;font-family:Arial;color:grey'>${geojsonRES.features[r].properties.descripcio}</LABEL></td>      
                                    </tr>`;
                                    //<tr align="center"  style='background-color:white;padding:3px;font-size:7.7pt;font-family:Arial Black;color:#660000;height:22px'>
                                    //    <td COLSPAN="2"><LABEL style='font-size:7pt;font-family:Arial;color:WHITE;background-color:${colorAplicable}'>${msgAplicable}</LABEL></td>            
                                    //</tr>
                                   
                               
                    }

                   
                 } 
               
                
             }catch( err ) {
                 //content[n]=""
                console.log("No hay"+arrayTablas[p]);
             }   
            

        }

        if(num_exp>0) html=html+`</TABLE>`; */
            
     /*   var htmlTableVIG="";
        if(html!="")
            htmlTableVIG=`<TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#ff9999" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
           
        <thead style="background-color:#ffcccc">
            <tr>       
                <th align="left" style="padding:3px;font-size:11px;font-family:Arial black;color:#000000">PLÀ VIGENT</td>
                                   
            </tr>
        </thead> 

        <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
            <td><br><LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>${html}</label></td>
           
        </tr>
        
    </TABLE>`; */

    var htmlTableVIG="";
    /*if(html!="")
        htmlTableVIG=`<TABLE style='padding:0px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:5px'  BORDER=0  bgcolor="#ff9999" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
       
   

    <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
        <td>
            <div  style='padding:0px;font-size:8pt;font-family:Arial;color:#000000;'>${html}</div>
        </td>
       
    </tr>
    
</TABLE>`; */

if(html!="")
htmlTableVIG=`<div align="center" style='padding:0px;font-size:8pt;font-family:Arial;color:#000000;'>${html}
            </div>
            `;

    var tabs=$( function() {
        $('#tabsInfo').tabs({
            activate: function (event,ui) {
               // console.log(ui.newTab.index());
                if(ui.newTab.index()){
                    

                }
            }
        })
    });

  

        var htmlTabsInfo=`<div style='padding:0px;min-width:250px' id="tabsInfo">
            <ul>
                <li><a href="#revision">REVISIÓ (Aprovació Inicial)</a></li>
              
            </ul>

            <div  id="revision">
                
                ${htmlTableREV}
                    
            </div>
           
        </div>

`;

       // var htmlF=htmlTableREV+"<BR>"+htmlTableVIG;

       // var htmlF=htmlTableREV

        console.log("termina for");
        //console.log("html=*"+htmlF+"*");
        if(htmlTableREV!="" || htmlTableVIG!=""){
                   
        L.popup({className: 'custom-popup'})
           .setLatLng(e.latlng)
           .setContent(htmlTabsInfo)
          // .setContent(htmlTableREV)
           .openOn(map);
           
       } 

       map.spin(false);


}