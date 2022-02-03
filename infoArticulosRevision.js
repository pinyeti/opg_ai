async function normativa_revision(tabla,fid){

    //  escribir acceso

    map.spin(true);

    if(cross_server){
        urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
        const paramsA = {server:protocol_server,accion:"articulos_revision:"+tabla};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
        await fetch(urlA,dataRequestA);
    }else{
        urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user");
        const paramsA = {accion:"articulos_revision:"+tabla};
        Object.keys(paramsA).forEach(key => urlA.searchParams.append(key, paramsA[key]));
        const dataRequestA = {
            method: 'GET'
        }; 
        await fetch(urlA,dataRequestA);
    }

    //console.log("tabla="+tabla+","+fid);

    var tableName=tabla;

   // var filtroSQL="tabla='"+tableName+"' order by articulo ";
    var filtroSQL="tabla='"+tableName+"'";

    /*let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_fase1");
    const params = {tabla: "v_articulos_plan_general", filtro: filtroSQL};
   // const params = {tabla: "articulos_detallada1", filtro: filtroSQL};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    let response = await fetch(url,dataRequest);
    //console.log(response);
    let info_geojson = await response.json();
    //console.log(info_geojson); */

    let info_geojson= await readDataFeatureRPG("v_articulos_plan_general",filtroSQL);

    // var arrayArticulos = new Array(); 

     //arrayArticulos=[];

     var arrayFeatures=[]; 
    if(info_geojson.features!=null && info_geojson!=null)
    for(var n=0;n<info_geojson.features.length;n++){

        //console.log(info_geojson.features[n].properties.articulo);

        var filtroSQL="";
        if(info_geojson.features[n].properties.filtro!="" && info_geojson.features[n].properties.filtro!=null)
            filtroSQL="fid="+fid+" and ("+info_geojson.features[n].properties.filtro+")";
        else
            filtroSQL="fid="+fid;

        /*url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_fase1");
        const params = {tabla: tableName, filtro: filtroSQL};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        response2 = await fetch(url,dataRequest);
        //console.log(response2);
        info_geojson2 = await response2.json(); */

        response2=null
        if(cross_server){
            let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/select_query_rpg_cross");
            const params2 = {server: protocol_server, select: "select fid from "+tableName+" where ("+filtroSQL+")"};
            Object.keys(params2).forEach(key => url.searchParams.append(key, params2[key]));
            const dataRequest2 = {
                method: 'GET'
            };
            response2 = await fetch(url,dataRequest2);
        }else{
            let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/select_query_rpg");
            const params2 = {select: "select fid from "+tableName+" where ("+filtroSQL+")"};
            Object.keys(params2).forEach(key => url.searchParams.append(key, params2[key]));
            const dataRequest2 = {
                method: 'GET'
            };
            response2 = await fetch(url,dataRequest2);
        }
        let info_geojson2 = await response2.json();

        //info_geojson2= await readDataFeatureRPG(tableName,filtroSQL);
    
        if(info_geojson2[0]!=null){
        //if(info_geojson2.features!=null){
          // console.log(info_geojson.features[n].properties.articulo+" "+info_geojson.features[n].properties.titulo);
           arrayFeatures.push(info_geojson.features[n]);
          // arrayArticulos.push([info_geojson.features[n],contDiv]);
          // console.log(info_geojson.features[n].properties.titulo);
        } 

    }

    // read detallada

  // const params2 = {tabla: "revision_articulos", filtro: filtroSQL};
  var filtroSQL2="tabla='"+tableName+"'";
   /* const params2 = {tabla: "v_articulos_detallada", filtro: filtroSQL2};
   let url2 = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_fase1");
    Object.keys(params2).forEach(key => url2.searchParams.append(key, params2[key]));
    const dataRequest2 = {
        method: 'GET'
    };
    response = await fetch(url2,dataRequest2);
    //console.log(response);
    info_geojson = await response.json(); */

    info_geojson= await readDataFeatureRPG("v_articulos_detallada",filtroSQL2);

    // var arrayArticulos = new Array(); 

     //arrayArticulos=[];

   var arrayFeaturesD=[]; 

  // console.log("features detallada="+info_geojson.features.length);

   if(info_geojson.features!=null && info_geojson!=null)
    for(var n=0;n<info_geojson.features.length;n++){

        //console.log(info_geojson.features[n].properties.articulo);

        var filtroSQL="";
        if(info_geojson.features[n].properties.filtro!="" && info_geojson.features[n].properties.filtro!=null)
            filtroSQL="fid="+fid+" and ("+info_geojson.features[n].properties.filtro+")";
        else
            filtroSQL="fid="+fid;

        /*let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_fase1");
        const params2 = {tabla: tableName, filtro: filtroSQL};
        Object.keys(params2).forEach(key => url.searchParams.append(key, params2[key]));
        const dataRequest2 = {
            method: 'GET'
        };
        let response2 = await fetch(url,dataRequest2);
        //console.log(response2);
        let info_geojson2 = await response2.json();*/

        response2=null
        if(cross_server){
            let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/select_query_rpg_cross");
            const params2 = {server: protocol_server, select: "select fid from "+tableName+" where ("+filtroSQL+")"};
            Object.keys(params2).forEach(key => url.searchParams.append(key, params2[key]));
            const dataRequest2 = {
                method: 'GET'
            };
            response2 = await fetch(url,dataRequest2);
        }else{
            let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/select_query_rpg");
            const params2 = {select: "select fid from "+tableName+" where ("+filtroSQL+")"};
            Object.keys(params2).forEach(key => url.searchParams.append(key, params2[key]));
            const dataRequest2 = {
                method: 'GET'
            };
            response2 = await fetch(url,dataRequest2);
        }
        let info_geojson2 = await response2.json();
        

       // let info_geojson2= await readDataFeatureRPG(tableName,filtroSQL);
    
        //if(info_geojson2.features[0]!=null){
         if(info_geojson2[0]!=null){
            console.log("json=",info_geojson2[0].fid);
          // console.log(info_geojson.features[n].properties.articulo+" "+info_geojson.features[n].properties.titulo);
           arrayFeaturesD.push(info_geojson.features[n]);
          // arrayArticulos.push([info_geojson.features[n],contDiv]);
          // console.log(info_geojson.features[n].properties.titulo);
        }else{
            console.log("articulo null=",info_geojson.features[n].properties.filtro)

          
        } 

    } 

    // end read detallada



    

   // if(arrayFeatures.length>0){
        arrayArticulos.push(arrayFeatures);
        arrayArticulosD.push(arrayFeaturesD);

        console.log("articulos length==="+arrayFeatures.length);
        console.log("articulos detallada length==="+arrayFeaturesD.length);

       /* for(var n=0;n<arrayFeaturesD.length;n++){

            feature=arrayFeaturesD[n];   
            tit=feature.properties.titulo;
            console.log(tit);

        } */
 
      //  showDialogNormativaRev(arrayArticulos,arrayFeaturesD);
       await showDialogNormativaTreeRevision(arrayFeatures,arrayFeaturesD)

       
       map.spin(false);
       // add articulus normas estructuradas

   
   // }
    
   
    
}

async function showDialogNormativaTreeRevision(arrayArticulos,arrayArticulosD)
        {
           
            
            $(function() {
                $('#jstree_articulos_normas_estructuradas').jstree({ 

                    'core' :              
                     {                    
                        'data' : [
                            {
                                "id": "root",
                                'text' : 'NORMES (PLÀ GENERAL)',
                                'state' : {
                                    'opened' : true,
                                    'selected' : true,
                                    //'checked' : true
                                }
                                
                            }
                        
                        ],
                        "check_callback" : true,
                                
                   
                    },

                    "plugins" : [ "search"],
                        "search": {
                                    "show_only_matches_children": true,
                                    "show_only_matches": true,
                                    //"show_leaves_only": true,
                                    //"append":true
                                }
                   
                    
                   
                });

                 var to = false;
                 $('#search-art-estr').keyup(function () {
                    if(to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        var v = $('#search-art-estr').val();
                         $('#jstree_articulos_normas_estructuradas').jstree(true).search(v);
                     }, 250);
                });

                 $('#jstree_articulos_normas_estructuradas').on("select_node.jstree", function (e, data) {

                        var elem = document.getElementById('divContentArt');        
                        elem.innerHTML=data.node.data;  
                        strDivArt=data.node.data
                        var elem = document.getElementById("tituloArt");
                        elem.innerHTML=data.node.text;  
                        titulo=data.node.text
                    
                })

                 $('#jstree_articulos_normas_estructuradas').bind("loaded.jstree", function (event, data) {
                   

                 //  console.log("cargarrrrrrrrrrrrrrrrrrrrrrrrrrr:", $('#jstree_articulos_normas_estructuradas').jstree().get_selected());

                   var selected= $('#jstree_articulos_normas_estructuradas').jstree().get_selected();
                     //   var nodeRoot = $('#jstree_articulos_normas_estructuradas').jstree().get_node(selected[0]); 

                     var nodeRoot = $('#jstree_articulos_normas_estructuradas').jstree().get_node("root"); 

                 //  console.log("cpaixxx="+arrayArticulos.length);

                 var articuloID=arrayArticulos[0].properties.articulo;
                 var articuloNode;
               
                 
                  if(arrayArticulos!=null)  
                for(var n=0;n<arrayArticulos.length;n++){
                    feature=arrayArticulos[n];   
                    
                    tit=feature.properties.titulo;
                   
                    if(feature.properties.relevancia=="High"){
                        tit=`<Label style='font-size:8pt;font-family:Arial Black;color:#540707'>${tit}</Label>`;
                        
                    }
                    if(feature.properties.relevancia=="Medium") tit=`<Label style='text-decoration:underline;font-size:9pt;font-family:Arial;color:#003366'>${tit}</Label>`;
                    if(feature.properties.tipo=="SArticle" || feature.properties.tipo=="Article"){
                        articuloID=feature.properties.articulo;
                       // titulo=feature.properties.titulo;
                        contenido=feature.properties.contenido;
                       // var selected= $('#jstree_articulos_normas_estructuradas').jstree().get_selected();
                       // var nodeRoot = $('#jstree_articulos_normas_estructuradas').jstree().get_node(selected[0]); 
                       // var nodeRoot=$('#jstree_ordenacion').jstree().get_node("root");
                        var nodeArt={ id:articuloID,text:tit,data:contenido,icon: "images/documentmanager/Article16.png"};
                        articuloNode=$('#jstree_articulos_normas_estructuradas').jstree(true).create_node( nodeRoot, nodeArt, 'last'); 
                       // $('#jstree_articulos_normas_estructuradas').jstree().refresh();

                        // console.log("paix=",nodeRoot);
                        // console.log("paix2=",res);
                       //  console.log(nodeArt);



                    }else{
                        paragraphID=feature.properties.articulo;
                       // titulo=feature.properties.titulo;
                        contenido=feature.properties.contenido;
                       // console.log("artid=",articuloID);
                       // var nodePadre = $('#jstree_articulos_normas_estructuradas').jstree().get_node(articuloID);
                       // console.log("que pasaaaa!!!",nodePadre,"padre=",articuloID);
                       // var tit=`<Label style='font-family:Arial Black;color:#0e0133'>${titulo}</Label>`;
                         var nodeArt={ id:paragraphID,text:tit,data:contenido,icon: "images/documentmanager/Paragraph16.png"};

                        node=$('#jstree_articulos_normas_estructuradas').jstree(true).create_node( articuloNode, nodeArt, 'last');  
                        if(node==false) $('#jstree_articulos_normas_estructuradas').jstree(true).create_node( nodeRoot, nodeArt, 'last');  

                         $(this).jstree('open_node',articuloID);


                    }

                    // var titulo="Art. "+arrayArticulos[n].properties.articulo+" "+arrayArticulos[n].properties.titulo;

                  //  console.log("articulo==="+arrayArticulos[0].properties.tipo+", "+arrayArticulos[n].properties.titulo);  
                }

                
                var find=false;
                for(var n=0;n<arrayArticulos.length && !find;n++){
                    feature=arrayArticulos[n];   
                
                    if(feature.properties.relevancia=="High"){
                        find=true;
                        $('#jstree_articulos_normas_estructuradas').jstree('select_node',feature.properties.articulo);

                    }
                }
                if(find==false) $('#jstree_articulos_normas_estructuradas').jstree('select_node',arrayArticulos[0].properties.articulo);
                

                

                });

                
            }) 

            var htmTreeArticulos_normas_estructuradas=`<div style='font-size:9pt;font-family:Arial;height:258px;overflow: auto;padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="jstree_articulos_normas_estructuradas"></div>`

            var primerFeatureHigh=arrayArticulos[0];
            var find=false;
            if(arrayArticulos!=null)  
            for(var n=0;n<arrayArticulos.length && !find;n++){
                feature=arrayArticulos[n];   
                
                if(feature.properties.relevancia=="High"){
                    find=true;
                    primerFeatureHigh=feature;

                }
            }

            strDivArt=""
            if(primerFeatureHigh!=null)
                strDivArt=`<div  id="divContentArt">`+primerFeatureHigh.properties.contenido+`</div>\n`;
            else
                strDivArt=`<div  id="divContentArt">-</div>\n`;


            // tree detallada

            $(function() {
                $('#jstree_articulos_normas_detalladas').jstree({ 

                    'core' :              
                     {                    
                        'data' : [
                            {
                                "id": "root",
                                'text' : 'ARTICLES (POD)',
                                'state' : {
                                    'opened' : true,
                                    'selected' : true,
                                    //'checked' : true
                                }
                                
                            }
                        
                        ],
                        "check_callback" : true,
                                
                   
                    },

                    "plugins" : [ "search"],
                        "search": {
                                    "show_only_matches_children": true,
                                    "show_only_matches": true,
                                    //"show_leaves_only": true,
                                    //"append":true
                                }
                   
                    
                   
                });

                 var to = false;
                 $('#search-art-det').keyup(function () {
                    if(to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        var v = $('#search-art-det').val();
                         $('#jstree_articulos_normas_detalladas').jstree(true).search(v);
                     }, 250);
                });

                 $('#jstree_articulos_normas_detalladas').on("select_node.jstree", function (e, data) {

                     /*   var elem = document.getElementById('divContentArt'); 
                      //  console.log("elem=",elem)    
                      //  console.log("dataselect=",data.node.data)    
                        elem.innerHTML=data.node.data;  
                        var elem = document.getElementById("tituloArt");
                        elem.innerHTML=data.node.text;  */
                    
                        var elem = document.getElementById('divContentArt');        
                        elem.innerHTML=data.node.data;  
                        strDivArt=data.node.data
                        var elem = document.getElementById("tituloArt");
                        elem.innerHTML=data.node.text;  
                        titulo=data.node.text
                })

                 $('#jstree_articulos_normas_detalladas').bind("loaded.jstree", function (event, data) {
                   

                 //  console.log("cargarrrrrrrrrrrrrrrrrrrrrrrrrrr:", $('#jstree_articulos_normas_estructuradas').jstree().get_selected());

                   var selected= $('#jstree_articulos_normas_detalladas').jstree().get_selected();
                     //   var nodeRoot = $('#jstree_articulos_normas_estructuradas').jstree().get_node(selected[0]); 

                     var nodeRoot = $('#jstree_articulos_normas_detalladas').jstree().get_node("root"); 

                 //  console.log("cpaixxx="+arrayArticulos.length);

                  var articuloID;
                  if(arrayArticulosD!=null)  
                for(var n=0;n<arrayArticulosD.length;n++){
                    feature=arrayArticulosD[n];
                   
                    tit=feature.properties.titulo;
                    if(feature.properties.relevancia=="High") tit=`<Label style='font-size:8pt;font-family:Arial Black;color:#540707'>${tit}</Label>`;
                    if(feature.properties.relevancia=="Medium") tit=`<Label style='text-decoration:underline;font-size:9pt;font-family:Arial;color:#003366'>${tit}</Label>`;
                  //  console.log(feature.properties.relevancia);
                    if(feature.properties.tipo=="SArticle"){
                        articuloID=feature.properties.articulo;
                        titulo=feature.properties.titulo;
                        contenido=feature.properties.contenido;
                       // var selected= $('#jstree_articulos_normas_estructuradas').jstree().get_selected();
                       // var nodeRoot = $('#jstree_articulos_normas_estructuradas').jstree().get_node(selected[0]); 
                       // var nodeRoot=$('#jstree_ordenacion').jstree().get_node("root");
                       
                        var nodeArt={ id:articuloID,text:tit,data:contenido,icon: "images/documentmanager/Article16.png"};
                        $('#jstree_articulos_normas_detalladas').jstree(true).create_node( nodeRoot, nodeArt, 'last'); 
                       // $('#jstree_articulos_normas_estructuradas').jstree().refresh();

                        // console.log("paix=",nodeRoot);
                        // console.log("paix2=",res);
                       //  console.log(nodeArt);

                      // console.log(articuloID+","+titulo+","+contenido)



                    }else{
                        paragraphID=feature.properties.articulo;
                        titulo=feature.properties.titulo;
                        contenido=feature.properties.contenido;
                       // console.log("artid=",articuloID);
                        var nodePadre = $('#jstree_articulos_normas_detalladas').jstree().get_node(articuloID);
                        
                         var nodeArt={ id:paragraphID,text:tit,data:contenido,icon: "images/documentmanager/Paragraph16.png"};
                        $('#jstree_articulos_normas_detalladas').jstree(true).create_node( nodePadre, nodeArt, 'last');  

                         $(this).jstree('open_node',articuloID);


                    }

                    // var titulo="Art. "+arrayArticulos[n].properties.articulo+" "+arrayArticulos[n].properties.titulo;

                  //  console.log("articulo==="+arrayArticulos[0].properties.tipo+", "+arrayArticulos[n].properties.titulo);  
                }

                var find=false;
                for(var n=0;n<arrayArticulosD.length && !find;n++){
                    feature=arrayArticulosD[n];   
                
                    if(feature.properties.relevancia=="High"){
                        find=true;
                        $('#jstree_articulos_normas_detalladas').jstree('select_node',feature.properties.articulo);

                    }
                }
                if(find==false) $('#jstree_articulos_normas_detalladas').jstree('select_node',arrayArticulosD[0].properties.articulo);
                
                

                });

                
            }) 

            var htmTreeArticulos_normas_detalladas=`<div style='font-size:9pt;font-family:Arial;height:258px;overflow: auto;padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="jstree_articulos_normas_detalladas"></div>`

           // var strDivArtDet=`<div  id="divContentArtDet">`+arrayNormativaRev[0][2]+`</div>\n`;
            


             //---------- tabs normes
     
            var tabs=$( function() {
                $('#tabsArticulos').tabs({
                    active: 1 ,
                    activate: function (event,ui) {
                    //
                  
                    }
                })

               
            });

            

            var htmlTabsArticulos=`<div  style='margin-top: -20px;margin-bottom: -20px; height:320px;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;font-size:8pt' id="tabsArticulos">
            <ul>
                <li><a href="#tabEstructurales">(PG) PLÀ GENERAL</a></li>
                <li><a href="#tabDetalladas">(POD) PLÀ ORDENACIÓ DETALLADA</a></li>
       
            </ul>

            <div style='overflow: auto;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="tabEstructurales">
                <div style='padding:3px;background-color:#fdfde0;border-style: solid;border-width:1pt;border-color:#78c4f0'>
                    <label class="icon"><i class="fa fa-search"></i></label>
                    <input id="search-art-estr" class="search-art-estr" />   
                    <button  style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Imprimeix norma seleccionada" OnClick="printNormaSelect()"><i class="fa fa-print"></i></button>
                </div>
                ${htmTreeArticulos_normas_estructuradas}
              
            </div>
            <div  style='overflow: auto;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="tabDetalladas">
                <div style='padding:3px;background-color:#fdfde0;border-style: solid;border-width:1pt;border-color:#78c4f0'>
                    <label class="icon"><i class="fa fa-search"></i></label>
                    <input id="search-art-det" class="search-art-det" />   
                    <button  style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Imprimeix artcile seleccionat" OnClick="printNormaSelect()"><i class="fa fa-print"></i></button>
          
                </div>
                ${htmTreeArticulos_normas_detalladas}
             
            </div>
 
        </div>
        `;

        titulo="";
        if(primerFeatureHigh!=null) titulo=primerFeatureHigh.properties.titulo

            html_buttons=`
                <button class="accordion">NORMATIVA ASSOCIADA</button>
                    <div  class="panel" style='padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;height:330px'>
                        <BR>      
                        ${htmlTabsArticulos}
                        <BR>
          
                    </div>
        
                <button id="tituloArt" class="accordion">${titulo}</button>
                    <div class="panel">
                        <BR>
                        ${strDivArt}
                        <BR>       
                    </div>`; 

        
        
    
            // Diseño 
            html="";
            html=html+`<div style='overflow: auto;padding:20px;background-color:#f2f2f2;border-style: solid;border-width:0pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:90%;top:10px;left:10px'>
              
 
                        ${html_buttons}
               
                        <BR>   
                        </div>`;

    

            var elem = document.getElementById('userinfo');        
             elem.innerHTML=html;  

          
            
            


            // ens add

             sidebar.open('userinfo');

             var acc = document.getElementsByClassName("accordion");
             var i;
             
             for (i = 0; i < acc.length; i++) {
                 acc[i].classList.toggle("activeB");
                 var panel = acc[i].nextElementSibling;
                 panel.style.display = "block";
                 acc[i].addEventListener("click", function() {
                     this.classList.toggle("activeB");
                    // console.log(this);
                     var panel = this.nextElementSibling;
                     if (panel.style.display === "block") {
                         panel.style.display = "none";
                         
                     } else {
                         panel.style.display = "block";
                       
                     }
                 });
                 
             }

             
             

        }

    async function printNormaSelect(tipo,codigo)
    {

        ventana = window.open('', 'PRINT', 'height=600,width=800');
        ventana.document.innerHTML = '';
        ventana.document.write(`<title>Norma/Article</title>`);
       
        tit_norma=`<DIV style='padding:3px;font-size:8.5pt;font-family:Arial Black;background-color:#cccc66;color:white;border-style: solid;border-width:0.1pt;border-color:RGB(12,1,73);width:99%'>${titulo}</DIV>`;
        ventana.document.write(tit_norma)  
        ventana.document.write('<BR>')  
        ventana.document.write(strDivArt);
       
        ventana.print();
        ventana.close();         
        
    }

