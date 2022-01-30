async function printModuleNormaSelect(tipo,codigo)
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
function getJSONDataRPG() {
    var test;


    $.ajax({
        async : true,
        type : "GET",
        //url : window.location.protocol+'//'+window.location.host+"/opg/readNormas",
        url : window.location.protocol+'//'+window.location.host+"/opg/infoquery_normativa_cross?normativa=plan_general_ai&server="+protocol_server,
        dataType : "json",
        success : function(json) {
            test = json;
            res=json
            console.log("jsondatatest=",test);
            
            $(function() {
                $('#jstree').jstree({ 
                    'core' :
                     {
                        //'data' : ['<button>Press</button> Articulo'],
                        'data' : json,
                       
                       "check_callback" : true,
                       "contextmenu" : {
                        "select_node" : true,
                        "show_at_node" : true,
                        "items" : {
                            renameItem: {
                               label             : "Rename",
                               action            : function (obj) {
                                   //do something }
                               },
                                 icon             : "fa fa-camera-retro",
                
                            },
                      
                           deleteItem: {
                               label             : "Delete",
                               action            : function (obj) {
                                                   tree.delete_node(node);
                                                   },
                               icon              : "fa fa-trash-o"
                          
                             }
                         }
                        },
                       
                   
                    },
                    
                    "plugins" : [ "contextmenu","search"],
                        "search": {
                                    "show_only_matches_children": true,
                                    "show_only_matches": true,
                                    //"show_leaves_only": true,
                                    //"append":true
                                }

    
                   
                });      

                var to = false;
                 $('#search-input').keyup(function () {
                    if(to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        var v = $('#search-input').val();
                         $('#jstree').jstree(true).search(v);
                     }, 250);
                });

                $(document).on('dnd_move.vakata', function (e, data) {  
                    console.log("paixxxxxx dnd move") 
               })  
               $(document).on('dnd_stop.vakata', function (e, data) {  
                console.log("paixxxxxx dnd stop") 
           })  
           $(document).on('dnd_start.vakata', function (e, data) {  
            console.log("paixxxxxx dnd start") 
       }) 

       $('#jstree').on('show_contextmenu.jstree', function (e, data) {
             console.log("click");
            
        });
                
                $('#jstree').on("changed.jstree", function (e, data) {
                    for(var p=0;p<data.selected.length;p++){

                        
                        console.log(data.selected[p]);
                        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data.selected[p];});
                        console.log("buscar=",buscar);
                        console.log("buscar texto=",buscar[1]);
                        var elem = document.getElementById('divContentNormativaRev');        
                        elem.innerHTML=buscar[2];  
                        strDivArt=buscar[2]
                        var elem = document.getElementById("tituloRev");
                        elem.innerHTML=buscar[1];  
                        titulo=buscar[1]

                        //var enabled = $( "#previsualizacion" ).checkboxradio( "option", "disabled" );
                        var enabled = document.getElementById("previsualizacion").value;
                        console.log(enabled)
                        if(enabled=="true") generateMapRev(buscar[3]);

                      /*  console.log("data properties:",buscar[3]);
                        console.log(buscar[3].length);
                        console.log(buscar[3][0].table+","+buscar[3][0].filter);^*/
                      //  for(var n=0;n<buscar[3].length;n++)
                       //    console.log("table="+buscar[3][n].table+","+buscar[3][n].filter)

                     

                    }
                   // console.log(data);
                });

                $('#jstree').bind("loaded.jstree", function (event, data) {
                    //$(this).jstree("open_all");
                    $(this).jstree('open_node',"npg_269");

                });

            });

            // end create jtree normativa estructural
            
            // jtree normativa detallada

            // end ct¡reate jtree normativa detallada

            
            cont=0;
            console.log("paixxAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",json);
            traverse(json);
            console.log("paixxAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",json);
            createTreeNormesDetaladasRPG()
           // createTreeNormesVigente()
           // createTreeNormesPRI()
            showNormativaRevision();
            console.log("cont="+cont)
           // await createTreeNormesDetaladas()

           
            

           /* var htmTree2=`<div style='padding:10px;overflow: scroll;background-color:#f2f2f2;border-style: solid;border-width:0.1pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:300px;top:40px;left:20px' id="jstree"></div>`
            console.log("rdrrd=",htmTree2);
            var elem = document.getElementById('compute');        
            elem.innerHTML=htmTree2;  */
           // console.log("json=",test);
           // return json;        
            // sidebar.open('compute');
            // L.control.slideMenu(htmTree2,{position: 'topright', menuposition: 'topright', width: '20%', height: '800px', delay: '50', icon: 'fa fa-map',hidden:false}).addTo(map);

                   
        },
        
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            test = "error";
        }
    });
    
    console.log("json=",test);
    return test;
}


function createTreeNormesDetaladasRPG() {
    var test;
    $.ajax({
        async : true,
        type : "GET",
        //url : window.location.protocol+'//'+window.location.host+"/opg/readNormasDetalladas",
        url : window.location.protocol+'//'+window.location.host+"/opg/infoquery_normativa_cross?normativa=ord_detallada_ai&server="+protocol_server,
        dataType : "json",
        success : function(jsonD) {
           // test = json;
           // res=json
           // console.log("jsondatatest=",test);
            
            $(function() {
                $('#jstree_normas_detalladas').jstree({ 
                    'core' :
                     {
                        //'data' : ['<button>Press</button> Articulo'],
                        'data' : jsonD,
                       
                       "check_callback" : true,
                       "contextmenu" : {
                        "select_node" : true,
                        "show_at_node" : true,
                        "items" : {
                            renameItem: {
                               label             : "Rename",
                               action            : function (obj) {
                                   //do something }
                               },
                                 icon             : "fa fa-camera-retro",
                
                            },
                      
                           deleteItem: {
                               label             : "Delete",
                               action            : function (obj) {
                                                   tree.delete_node(node);
                                                   },
                               icon              : "fa fa-trash-o"
                          
                             }
                         }
                        },
                       
                   
                    },
                    
                    "plugins" : [ "contextmenu","search"],
                        "search": {
                                    "show_only_matches_children": true,
                                    "show_only_matches": true,
                                    //"show_leaves_only": true,
                                    //"append":true
                                }

    
                   
                });      

                var to = false;
                 $('#search-input-detalladas').keyup(function () {
                    if(to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        console.log("paix keyyy");
                        var v = $('#search-input-detalladas').val();
                         $('#jstree_normas_detalladas').jstree(true).search(v);
                     }, 250);

                   
                });

                $(document).on('dnd_move.vakata', function (e, data) {  
                    console.log("paixxxxxx dnd move") 
               })  
               $(document).on('dnd_stop.vakata', function (e, data) {  
                console.log("paixxxxxx dnd stop") 
           })  
           $(document).on('dnd_start.vakata', function (e, data) {  
            console.log("paixxxxxx dnd start") 
       }) 

       $('#jstree_normas_detalladas').on('show_contextmenu.jstree', function (e, data) {
             console.log("click");
            
        });
                
                $('#jstree_normas_detalladas').on("changed.jstree", function (e, data) {
                    for(var p=0;p<data.selected.length;p++){

                        
                        console.log(data.selected[p]);
                        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data.selected[p];});
                        console.log("buscar=",buscar);
                        console.log("buscar texto=",buscar[1]);
                        var elem = document.getElementById('divContentNormativaRev');        
                        elem.innerHTML=buscar[2];  
                        strDivArt=buscar[2]
                        var elem = document.getElementById("tituloRev");
                        elem.innerHTML=buscar[1];  
                        titulo=buscar[1]


                        //var enabled = $( "#previsualizacion" ).checkboxradio( "option", "disabled" );
                        var enabled = document.getElementById("prev_det").value;
                        console.log(enabled)
                        if(enabled=="true") generateMapRev(buscar[3]);

                      /*  console.log("data properties:",buscar[3]);
                        console.log(buscar[3].length);
                        console.log(buscar[3][0].table+","+buscar[3][0].filter);^*/
                      //  for(var n=0;n<buscar[3].length;n++)
                       //    console.log("table="+buscar[3][n].table+","+buscar[3][n].filter)

                        

                    }
                   // console.log(data);
                });

                $('#jstree_normas_detalladas').bind("loaded.jstree", function (event, data) {
                    //$(this).jstree("open_all");
                    $(this).jstree('open_node',"nd_540");
                   

                });

            });


            traverse(jsonD);
            console.log("paix1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",jsonD);

           //showNormativaRevision();
           

                   
        },
        
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            test = "error";
        }
    });
    
    console.log("json=",test);
    return test;
}


function createTreeNormesVigente() {
    var test;
    $.ajax({
        async : true,
        type : "GET",
        url : window.location.protocol+'//'+window.location.host+"/opg/readNormasVigente",
        dataType : "json",
        success : function(jsonV) {
           // test = json;
           // res=json
           // console.log("jsondatatest=",test);
            
            $(function() {
                $('#jstree_normas_vigente').jstree({ 
                    'core' :
                     {
                        //'data' : ['<button>Press</button> Articulo'],
                        'data' : jsonV,
                       
                       "check_callback" : true,
                       "contextmenu" : {
                        "select_node" : true,
                        "show_at_node" : true,
                        "items" : {
                            renameItem: {
                               label             : "Rename",
                               action            : function (obj) {
                                   //do something }
                               },
                                 icon             : "fa fa-camera-retro",
                
                            },
                      
                           deleteItem: {
                               label             : "Delete",
                               action            : function (obj) {
                                                   tree.delete_node(node);
                                                   },
                               icon              : "fa fa-trash-o"
                          
                             }
                         }
                        },
                       
                   
                    },
                    
                    "plugins" : [ "contextmenu","search"],
                        "search": {
                                    "show_only_matches_children": true,
                                    "show_only_matches": true,
                                    //"show_leaves_only": true,
                                    //"append":true
                                }

    
                   
                });      

                var to = false;
                 $('#search-input-vigente').keyup(function () {
                    if(to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        console.log("paix keyyy");
                        var v = $('#search-input-vigente').val();
                         $('#jstree_normas_vigente').jstree(true).search(v);
                     }, 250);
                });

                $(document).on('dnd_move.vakata', function (e, data) {  
                    console.log("paixxxxxx dnd move") 
               })  
               $(document).on('dnd_stop.vakata', function (e, data) {  
                console.log("paixxxxxx dnd stop") 
           })  
           $(document).on('dnd_start.vakata', function (e, data) {  
            console.log("paixxxxxx dnd start") 
       }) 

       $('#jstree_normas_vigente').on('show_contextmenu.jstree', function (e, data) {
             console.log("click");
            
        });
                
                $('#jstree_normas_vigente').on("changed.jstree", function (e, data) {
                    for(var p=0;p<data.selected.length;p++){

                        
                        console.log(data.selected[p]);
                        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data.selected[p];});
                        console.log("buscar=",buscar);
                        console.log("buscar texto=",buscar[1]);
                        var elem = document.getElementById('divContentNormativaRev');        
                        elem.innerHTML=buscar[2];  
                        var elem = document.getElementById("tituloRev");
                        elem.innerHTML=buscar[1];  

                        //var enabled = $( "#previsualizacion" ).checkboxradio( "option", "disabled" );
                        var enabled = document.getElementById("prev_vig").value;
                        console.log(enabled)
                        if(enabled=="true") generateMapVig(buscar[3]);

                      /*  console.log("data properties:",buscar[3]);
                        console.log(buscar[3].length);
                        console.log(buscar[3][0].table+","+buscar[3][0].filter);^*/
                      //  for(var n=0;n<buscar[3].length;n++)
                       //    console.log("table="+buscar[3][n].table+","+buscar[3][n].filter)

                        

                    }
                   // console.log(data);
                });

                $('#jstree_normas_vigente').bind("loaded.jstree", function (event, data) {
                    //$(this).jstree("open_all");
                    $(this).jstree('open_node',"vig_429");
                   // $(this).jstree('open_node',"nd_46");

                });

            });


            traverse(jsonV);
            console.log("paix1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",jsonV);

           //showNormativaRevision();
           

                   
        },
        
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            test = "error";
        }
    });
    
    console.log("json=",test);
    return test;
}


function createTreeNormesPRI() {
    var test;
    $.ajax({
        async : true,
        type : "GET",
        url : window.location.protocol+'//'+window.location.host+"/opg/readNormasPRI",
        dataType : "json",
        success : function(jsonP) {
           // test = json;
           // res=json
           // console.log("jsondatatest=",test);
            
            $(function() {
                $('#jstree_normas_pri').jstree({ 
                    'core' :
                     {
                        //'data' : ['<button>Press</button> Articulo'],
                        'data' : jsonP,
                       
                       "check_callback" : true,
                       "contextmenu" : {
                        "select_node" : true,
                        "show_at_node" : true,
                        "items" : {
                            renameItem: {
                               label             : "Rename",
                               action            : function (obj) {
                                   //do something }
                               },
                                 icon             : "fa fa-camera-retro",
                
                            },
                      
                           deleteItem: {
                               label             : "Delete",
                               action            : function (obj) {
                                                   tree.delete_node(node);
                                                   },
                               icon              : "fa fa-trash-o"
                          
                             }
                         }
                        },
                       
                   
                    },
                    
                    "plugins" : [ "contextmenu","search"],
                        "search": {
                                    "show_only_matches_children": true,
                                    "show_only_matches": true,
                                    //"show_leaves_only": true,
                                    //"append":true
                                }

    
                   
                });      

                var to = false;
                 $('#search-input-pri').keyup(function () {
                    if(to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        console.log("paix keyyy");
                        var v = $('#search-input-pri').val();
                         $('#jstree_normas_pri').jstree(true).search(v);
                     }, 250);
                });

                $(document).on('dnd_move.vakata', function (e, data) {  
                    console.log("paixxxxxx dnd move") 
               })  
               $(document).on('dnd_stop.vakata', function (e, data) {  
                console.log("paixxxxxx dnd stop") 
           })  
           $(document).on('dnd_start.vakata', function (e, data) {  
            console.log("paixxxxxx dnd start") 
       }) 

       $('#jstree_normas_pri').on('show_contextmenu.jstree', function (e, data) {
             console.log("click");
            
        });
                
                $('#jstree_normas_pri').on("changed.jstree", function (e, data) {
                    for(var p=0;p<data.selected.length;p++){

                        
                        console.log(data.selected[p]);
                        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data.selected[p];});
                        console.log("buscar=",buscar);
                        console.log("buscar texto=",buscar[1]);
                        var elem = document.getElementById('divContentNormativaRev');        
                        elem.innerHTML=buscar[2];  
                        var elem = document.getElementById("tituloRev");
                        elem.innerHTML=buscar[1];  

                        //var enabled = $( "#previsualizacion" ).checkboxradio( "option", "disabled" );
                        var enabled_pri = document.getElementById("prev_pri").value;
                       // console.log("enabled==="+enabled)
                        if(enabled_pri=="true") generateMapVig(buscar[3]);

                      /*  console.log("data properties:",buscar[3]);
                        console.log(buscar[3].length);
                        console.log(buscar[3][0].table+","+buscar[3][0].filter);^*/
                      //  for(var n=0;n<buscar[3].length;n++)
                       //    console.log("table="+buscar[3][n].table+","+buscar[3][n].filter)

                        

                    }
                   // console.log(data);
                });

                $('#jstree_normas_pri').bind("loaded.jstree", function (event, data) {
                    //$(this).jstree("open_all");
                    $(this).jstree('open_node',"pri_151");
                   // $(this).jstree('open_node',"nd_46");

                });

            });


            traverse(jsonP);
            console.log("paix1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",jsonP);

           //showNormativaRevision();
           

                   
        },
        
        error : function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            test = "error";
        }
    });
    
    console.log("json=",test);
    return test;
}


async function customMenu(node) {

    var tree = $("#jstree").jstree(true);
     
           var items = {
               renameItem: {
                  label             : "Rename",
                  action            : function (obj) {
                      //do something }
                  },
                    icon             : "fa fa-camera-retro",
   
               },
         
              deleteItem: {
                  label             : "Delete",
                  action            : function (obj) {
                                      tree.delete_node(node);
                                      },
                  icon              : "fa fa-trash-o"
             
                }
            };
  
            return items;
     }

 function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}

async function  generateMapRev(listLayers)
{
    // remove of map
    console.log("layers",layersMapRev);
    for(n=0;n<layersMapRev.length;n++){
      
        console.log("remove to map "+layersMapRev[n]);
       // mapNormativa.removeLayer(layersMapRev[n]);
        map.removeLayer(layersMapRev[n]);
    }
    layersMapRev=new Array();


    console.log(listLayers);
    for(var n=0;n<listLayers.length;n++){

        var filter;
        if(listLayers[n].filter=="") 
            filter="fid>0";
        else
            filter=listLayers[n].filter;

         let info_geojson= await readDataFeatureRPG(listLayers[n].table,filter);
        //let info_geojson= await readDataFeature(listLayers[n].table,filter);

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


        layersMapRev.push(layerQuery);
       // layerQuery.addTo(mapNormativa);  
        layerQuery.addTo(map);  

        console.log("table adds="+listLayers[n].table+","+listLayers[n].filter)
    }

    for(var n=0;n<layersMapRev.length;n++){
        console.log("add to map "+layersMapRev[n]);
       // console.log("table="+listLayers[n].table+","+listLayers[n].filter)
    } 

}

async function  generateMapVig(listLayers)
{
    // remove of map
    console.log("layers",layersMapRev);
    for(n=0;n<layersMapRev.length;n++){
      
        console.log("remove to map "+layersMapRev[n]);
       // mapNormativa.removeLayer(layersMapRev[n]);
        map.removeLayer(layersMapRev[n]);
    }
    layersMapRev=new Array();


    console.log(listLayers);
    for(var n=0;n<listLayers.length;n++){

        var filter;
        if(listLayers[n].filter=="") 
            filter="fid>0";
        else
            filter=listLayers[n].filter;

         let info_geojson= await readDataFeature(listLayers[n].table,filter);
        //let info_geojson= await readDataFeature(listLayers[n].table,filter);

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


        layersMapRev.push(layerQuery);
       // layerQuery.addTo(mapNormativa);  
        layerQuery.addTo(map);  

        console.log("table adds="+listLayers[n].table+","+listLayers[n].filter)
    }

    for(var n=0;n<layersMapRev.length;n++){
        console.log("add to map "+layersMapRev[n]);
       // console.log("table="+listLayers[n].table+","+listLayers[n].filter)
    } 

}


async function addLayersNormativaVig()
{

    console.log("add layers notmativa");
    var data;

    var activeTabIdx = $('#tabsNormes').tabs('option','active');

    if(activeTabIdx==2)
        data=$("#jstree_normas_vigente").jstree('get_selected');
    else if(activeTabIdx==3)
        data=$("#jstree_normas_pri").jstree('get_selected');

   
    console.log("data",data);
    for(var p=0;p<data.length;p++){

                        
        console.log(data[p]);
        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data[p];});
        console.log("buscar=",buscar);
        console.log("buscar texto=",buscar[1]);

       // generateMapRev(buscar[3]);

        var listLayers=buscar[3];

        var node_AP;
       
        var nodeP = $('#jstree_normativa').jstree().get_node("root"); 
        if(listLayers.length>1){
           // var idN=layersMapNormativa.length+1;
            node={ id:buscar[0],text:buscar[1]};
            node_AP=$('#jstree_normativa').jstree().create_node( nodeP, node, 'last');
        }
        

        for(var n=0;n<listLayers.length;n++){

            var filter;
            if(listLayers[n].filter=="") 
                filter="fid>0";
            else
                filter=listLayers[n].filter;
    
            let info_geojson= await readDataFeature(listLayers[n].table,filter);
    
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
    
    
            layersMapRev.push(layerQuery);
           // layerQuery.addTo(mapNormativa);  
            layerQuery.addTo(map);  
    
            console.log("table adds="+listLayers[n].table+","+listLayers[n].filter+","+listLayers[n].name);

            var idN=layersMapNormativa.length+1;
          //  var node = { id:buscar[0],text:buscar[1]};
            if(listLayers.length>1){
                node={ id:buscar[0]+"_"+n,text:listLayers[n].name};
                layersMapNormativa.push([buscar[0]+"_"+n,layerQuery]);
                layerQuery.addTo(map);
                $('#jstree_normativa').jstree().create_node( node_AP, node, 'last');
              //  $('#jstree_normativa').jstree().create_node( nodeP, node_AP, 'last');
            }else{
                layersMapNormativa.push([buscar[0],layerQuery]);
                layerQuery.addTo(map);
                node={ id:buscar[0],text:buscar[1]};
                $('#jstree_normativa').jstree().create_node( nodeP, node, 'last');
            }
        }
    

      

    }
}

async function addLayersNormativa()
{

    console.log("add layers notmativa");
    var data;

    var activeTabIdx = $('#tabsNormes').tabs('option','active');
    console.log("tabsindex=",activeTabIdx);
    
    if(activeTabIdx==0)
        data=$("#jstree").jstree('get_selected');
    else if(activeTabIdx==1)
            data=$("#jstree_normas_detalladas").jstree('get_selected');
    console.log("data",data);
    for(var p=0;p<data.length;p++){

                        
        console.log(data[p]);
        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data[p];});
        console.log("buscar=",buscar);
        console.log("buscar texto=",buscar[1]);

       // generateMapRev(buscar[3]);

        var listLayers=buscar[3];

        var node_AP;
       
        var nodeP = $('#jstree_normativa').jstree().get_node("root"); 
        if(listLayers.length>1){
           // var idN=layersMapNormativa.length+1;
            node={ id:buscar[0],text:buscar[1]};
            node_AP=$('#jstree_normativa').jstree().create_node( nodeP, node, 'last');
        }
        

        for(var n=0;n<listLayers.length;n++){

            var filter;
            if(listLayers[n].filter=="") 
                filter="fid>0";
            else
                filter=listLayers[n].filter;
    
            let info_geojson= await readDataFeatureRPG(listLayers[n].table,filter);
    
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
    
    
            layersMapRev.push(layerQuery);
           // layerQuery.addTo(mapNormativa);  
            layerQuery.addTo(map);  
    
            console.log("table adds="+listLayers[n].table+","+listLayers[n].filter+","+listLayers[n].name);

            var idN=layersMapNormativa.length+1;
          //  var node = { id:buscar[0],text:buscar[1]};
            if(listLayers.length>1){
                node={ id:buscar[0]+"_"+n,text:listLayers[n].name};
                layersMapNormativa.push([buscar[0]+"_"+n,layerQuery]);
                layerQuery.addTo(map);
                $('#jstree_normativa').jstree().create_node( node_AP, node, 'last');
              //  $('#jstree_normativa').jstree().create_node( nodeP, node_AP, 'last');
            }else{
                layersMapNormativa.push([buscar[0],layerQuery]);
                layerQuery.addTo(map);
                node={ id:buscar[0],text:buscar[1]};
                $('#jstree_normativa').jstree().create_node( nodeP, node, 'last');
            }
        }
    

      

    }
}

async function downloadNormativa()
{

    console.log("download layers notmativa");
    var data;

    var activeTabIdx = $('#tabsNormes').tabs('option','active');
    console.log("tabsindex=",activeTabIdx);
    
    if(activeTabIdx==0)
        data=$("#jstree").jstree('get_selected');
    else if(activeTabIdx==1)
            data=$("#jstree_normas_detalladas").jstree('get_selected');
    console.log("data",data);

    // prepare zip
    var zip = new JSZip();
    var folderConsultas = zip.folder("Normativa");
    //img.file("smile.gif", imgData, {base64: true});

    for(var p=0;p<data.length;p++){

                        
        console.log(data[p]);
        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data[p];});
        console.log("buscar=",buscar);
        console.log("buscar texto=",buscar[0]);
        console.log("buscar texto=",buscar[1]);

        var folderApartado = folderConsultas.folder(buscar[1]);
       

       // generateMapRev(buscar[3]);

        var listLayers=buscar[3];        

        for(var n=0;n<listLayers.length;n++){

            var filter;
            if(listLayers[n].filter=="") 
                filter="fid>0";
            else
                filter=listLayers[n].filter;
    
            let info_geojson= await readDataFeatureRPG(listLayers[n].table,filter);
            jsonData = JSON.stringify(info_geojson);
            var file = new Blob([jsonData], {type: 'text/plain'});
            folderApartado.file(listLayers[n].name+".geojson", file);
    
        }
     

    }
    zip.generateAsync({type:"blob"})
        .then(function(content) {
        // see FileSaver.js
         //saveAs(content, "example.zip");
         saveAs(content, "normativa_download.zip");
        });
}

async function downloadNormativaVig()
{

    console.log("download layers notmativa");
    var data;

    var activeTabIdx = $('#tabsNormes').tabs('option','active');
    console.log("tabsindex=",activeTabIdx);
    
    if(activeTabIdx==2)
        data=$("#jstree_normas_vigente").jstree('get_selected');
    else if(activeTabIdx==3)
            data=$("#jstree_normas_pri").jstree('get_selected');
    console.log("data",data);

    // prepare zip
    var zip = new JSZip();
    var folderConsultas = zip.folder("Normativa");
    //img.file("smile.gif", imgData, {base64: true});

    for(var p=0;p<data.length;p++){

                        
        console.log(data[p]);
        var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == data[p];});
        console.log("buscar=",buscar);
        console.log("buscar texto=",buscar[0]);
        console.log("buscar texto=",buscar[1]);

        var folderApartado = folderConsultas.folder(buscar[1]);
       

       // generateMapRev(buscar[3]);

        var listLayers=buscar[3];        

        for(var n=0;n<listLayers.length;n++){

            var filter;
            if(listLayers[n].filter=="") 
                filter="fid>0";
            else
                filter=listLayers[n].filter;
    
            let info_geojson= await readDataFeature(listLayers[n].table,filter);
            jsonData = JSON.stringify(info_geojson);
            var file = new Blob([jsonData], {type: 'text/plain'});
            folderApartado.file(listLayers[n].name+".geojson", file);
    
        }
     

    }
    zip.generateAsync({type:"blob"})
        .then(function(content) {
        // see FileSaver.js
         //saveAs(content, "example.zip");
         saveAs(content, "normativa_download.zip");
        });
}

async function showNormativaRevision(){

     cont=0;
    // traverse(json);
     console.log("arrayNormativaRev=",arrayNormativaRev);
     var idObj="200"
     var buscar = arrayNormativaRev.find(function(objeto){ return objeto[0] == idObj;});
     console.log("buscar=",buscar);
    //  console.log("buscar texto=",buscar[1]);

  //  var htmTree2=`<div style='padding:10px;overflow: scroll;background-color:#f2f2f2;border-style: solid;border-width:0.1pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:300px;top:40px;left:20px' id="jstree"></div>`
   // var strDivTitulo=`<div style='padding:10px;font-size:9pt;font-family:Arial Black;background-color:#f2f2f2;border-style: solid;border-width:0.1pt;border-color:black;position:absolute;width:90%;height:35px;top:280px;left:20px' id="divTitulo`+contDiv+`">`+titulo+`</div>\n`;   
   // var strDiv=`<div style='padding:10px;overflow: scroll;background-color:#f2f2f2;border-style: solid;border-width:0.1pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:40%;top:380px;left:20px' id="divContentNormativaRev">`+arrayNormativaRev[0][2]+`</div>\n`;

   /* var html=htmTree2+strDiv;
    var elem = document.getElementById('compute');        
    elem.innerHTML=html;  */
   
   /* $.each(json, function(key,val){
        console.log(key,val);
     }); */

    // var htmTree2=`<div style='padding:10px;overflow: scroll;background-color:#f2f2f2;border-style: solid;border-width:0.1pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);height:250px' id="jstree"></div>`
     var htmTree2=`<div style='font-size:8.7pt;font-family:Arial;height:258px;overflow: auto;padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="jstree"></div>`

     var htmTreeNormesDetalladas=`<div style='font-size:8.7pt;font-family:Arial;height:258px;overflow: auto;padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="jstree_normas_detalladas"></div>`
   
     var htmTreeNormesVigente=`<div style='font-size:8.7pt;font-family:Arial;height:258px;overflow: auto;padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="jstree_normas_vigente"></div>`

     var htmTreeNormesPRI=`<div style='font-size:8.7pt;font-family:Arial;height:258px;overflow: auto;padding-top: 5px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="jstree_normas_pri"></div>`
   

     var strDiv=`<div  id="divContentNormativaRev">`+arrayNormativaRev[0][2]+`</div>\n`;
    

     // prueba jquery ui

     var tabs=$( function() {
        $('#tabs').tabs({
            activate: function (event,ui) {
               // console.log(ui.newTab.index());
                if(ui.newTab.index()){
                    

                    
                    if(initMapRev==false){

                        mapNormativa = L.map('map2',{ center: [39.5795100, 2.6874500], zoom: 11, maxZoom: 18});
                             var cartodb_light_all=L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {   
                                minZoom:11, 
                                maxZoom: 20,
                              //  maxNativeZoom: 19,
                                // attribution: '© OpenStreetMap', 
                                edgeBufferTiles: 1
                                
                            }).addTo(mapNormativa);

                            L.tileLayer('http://'+serverPath+'/images/REVISION_FASE1/{z}/{x}/{y}.png', {
                                minZoom: 11,
                                maxZoom: 20,
                                tms: false,
                                // attribution: 'Generated by TilesXYZ',
                                edgeBufferTiles: 1,
                                opacity: 0.30
                
                            }).addTo(mapNormativa);  
                            initMapRev=true;    
                    }  

                }
            }
        })
      } );

   /*   tabs.on( "click", function(event,ui) {
     
        console.log("click in tab",event,ui)
      }); */

    

    var htmlTabs=`<div  id="tabs">
                    <ul>
                        <li><a href="#contentRev">Texto</a></li>
                        <li><a href="#map2">Mapa</a></li>
                    </ul>
        
                    <div  style='overflow-x: scroll' id="contentRev">
                        <BR>
                         ${strDiv}
                        <BR>    
                    </div>
                    <div  id="map2">
                        
                    </div>
                </div>
        
        `;


     //---------- tabs normes
     
     var tabs=$( function() {
        $('#tabsNormes').tabs({
            activate: function (event,ui) {
            //
            }
        })
    });

   /* $( function() {
        $( "#speed" ).selectmenu();
       // $( "#speed" ).selectmenu( "enable" );
       // $( "#speed" ).selectmenu( "open" );
    } );

    prueba=`
    <div>
    <select class="speed" name="speed" id="speed">
        <option>Slower</option>
        <option>Slow</option>
    </select>
    </div>
    `;*/


    /*
    <li title="Normes Plà Vigent"><a href="#tabVigente">VIGENT</a></li>
                <li title="Normes (PRI) Platja de palma"><a href="#tabPRI">PRI</a></li>

    <div  style='overflow: auto;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="tabVigente">
                <div style='padding:3px;background-color:#fdfde0;border-style: solid;border-width:1pt;border-color:#78c4f0'>
                    <label class="icon"><i class="fa fa-search"></i></label>
                    <input style="width:120px" title="Cercar texto en els títols del apartats" id="search-input-vigente" class="search-input-vigente" />   
                    <button style="position:absolute;right:95px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="downloadNormativaVig()"><i class="fa fa-download"></i></button> 
                    <button style="position:absolute;right:60px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Afegeix apartats a taula de contingut" OnClick="addLayersNormativaVig()"><i class="fa fa-plus-circle"></i></button>
                    <label style='position:absolute;right:5px' for=""prev_vig">Prev
                        <input type="checkbox" name="prev_vig" id="prev_vig" value="false" OnClick="changePrev_vig()">
                    </label>
                </div>
                ${htmTreeNormesVigente}
            </div>
            <div  style='overflow: auto;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="tabPRI">
                <div style='padding:3px;background-color:#fdfde0;border-style: solid;border-width:1pt;border-color:#78c4f0'>
                    <label class="icon"><i class="fa fa-search"></i></label>
                    <input style="width:120px" title="Cercar texto en els títols del apartats" id="search-input-pri" class="search-input-pri" />   
                    <button style="position:absolute;right:95px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="downloadNormativaVig()"><i class="fa fa-download"></i></button> 
                    <button style="position:absolute;right:60px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Afegeix apartats a taula de contingut" OnClick="addLayersNormativaVig()"><i class="fa fa-plus-circle"></i></button>
                    <label style='position:absolute;right:5px' for="prev_pri">Prev
                    <input type="checkbox" name="prev_pri" id="prev_pri" value="false" OnClick="changePrev_pri()"> 
                    </label>
                </div>
                ${htmTreeNormesPRI}
            </div>
    */

    var htmlTabsNormes=`<div  style='margin-top: -20px;margin-bottom: -20px; height:320px;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;font-size:7.8pt' id="tabsNormes">
            <ul>
                <li title="Normes Estructurals de la Revisió"><a href="#tabEstructurales">(PG) PLA GENERAL</a></li>
                <li title="Normes Detallades de la Revisió"><a href="#tabDetalladas">(POD) PLA ORDENACIÓ DETALLADA</a></li>
                
              
       
            </ul>

            <div  style='overflow: auto;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="tabEstructurales">
                <div  style='padding:3px;background-color:#fdfde0;border-style: solid;border-width:1pt;border-color:#78c4f0'>
                    <label class="icon"><i class="fa fa-search"></i></label>
                    <input style="width:120px" title="Cercar texto en els títols del apartats" id="search-input" class="search-input" />  
                    <button  style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Imprimeix norma seleccionada" OnClick="printModuleNormaSelect()"><i class="fa fa-print"></i></button>
             
                    <button style="position:absolute;right:95px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="downloadNormativa()"><i class="fa fa-download"></i></button> 
                    <button style="position:absolute;right:60px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Afegeix apartats a taula de contingut" OnClick="addLayersNormativa()"><i class="fa fa-plus-circle"></i></button>
                   <!-- <input style='font-size:7pt;position:absolute;right:140px;height:20' class="ui-button ui-widget ui-corner-all" type="button" name="addLayersNormativa" value="AFEGIR" OnClick="addLayersNormativa()" > -->
                    <label style='position:absolute;right:5px' for="checkbox-nested-1">Prev
                        <input  title="Previtsualiza apartats dins el Mapa" type="checkbox" name="previsualizacion" id="previsualizacion" value="false" OnClick="changePrev()">
                    </label>
                </div>
                ${htmTree2}
            </div>
            <div  style='overflow: auto;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px' id="tabDetalladas">
                <div style='padding:3px;background-color:#fdfde0;border-style: solid;border-width:1pt;border-color:#78c4f0'>
                    <label class="icon"><i class="fa fa-search"></i></label>
                    <input style="width:120px" title="Cercar texto en els títols del apartats" id="search-input-detalladas" class="search-input-detalladas" />   
                    <button  style="padding-top:4px;padding-bottom:4px;" class="ui-button ui-widget ui-corner-all" title="Imprimeix norma seleccionada" OnClick="printModuleNormaSelect()"><i class="fa fa-print"></i></button>
             
                    <button style="position:absolute;right:95px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Descàrrega en format geojson" OnClick="downloadNormativa()"><i class="fa fa-download"></i></button> 
                    <button style="position:absolute;right:60px;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Afegeix apartats a taula de contingut" OnClick="addLayersNormativa()"><i class="fa fa-plus-circle"></i></button>
                    <label style='position:absolute;right:5px' for="prev_det">Prev
                        <input type="checkbox" name="prev_det" id="prev_det" value="false" OnClick="changePrev_det()">
                    </label>
                </div>
                ${htmTreeNormesDetalladas}
            </div>
            

 
        </div>
        `;

      // ${htmTreeNormesDetalladas}

    //-------------- jqueryui accordion

    $( function() {
        $( "#accordionNormativa" ).accordion({
            heightStyle: "content",
            collapsible: true,
          });
    } );

    var htmAccordionN=`<div style='padding:0px;height:450px' id="accordionNormativa">
        
        <h3>NORMES URBANISTIQUES DE LA REVISIÓ DEL PLÀ GENERAL</h3>
            <div style='padding:0px;height:390px'>
                ${htmTree2} 
            </div>
       
        <h3>${arrayNormativaRev[0][1]}</h3>
            <div style='padding:0px'>
                ${strDiv}
            </div>
    
        </div>`;

    //------

     var html_button="";
    
        html_buttons=`
        <button class="accordion">NORMES URBANISTIQUES DE LA REVISIÓ DEL PLÀ GENERAL</button>
        <div  class="panel" style='padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;height:330px'>
            <BR>
            
            ${htmlTabsNormes}
            <BR>
          
        </div>
        
        <button id="tituloRev" class="accordion">${arrayNormativaRev[0][1]}</button>
        <div class="panel">
            <BR>
            ${strDiv}
            <BR>
          
        </div>`; 

        
        
    
    // Diseño 
    html="";
    html=html+`<div style='overflow: auto;padding:20px;background-color:#f2f2f2;border-style: solid;border-width:0pt;border-color:black;box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);position:absolute;width:90%;height:90%;top:10px;left:10px'>
              
   
                
               
 
                ${html_buttons}
               
                <BR>   
                </div>`;

    

    var elem = document.getElementById('compute');        
    elem.innerHTML=html;  

  /*  var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("activeB");
            console.log(this);
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
        
    } */


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


    // create Map

  /*  var mapNormativa = L.map('map2',{ center: [39.5795100, 2.6874500], zoom: 10, maxZoom: 18});

    L.tileLayer('http://'+serverPath+'/images/PG/{z}/{x}/{y}.png', {
                minZoom: 12,
                maxZoom: 20,
                tms: false,
                // attribution: 'Generated by TilesXYZ',
                edgeBufferTiles: 1,
                opacity: 1

            }).addTo(mapNormativa);  */


    // ------
     

    
     
}

function changePrev()
{
    var valor = document.getElementById("previsualizacion").value;
    console.log(valor);
    if(valor=="false") 
        document.getElementById("previsualizacion").value = "true";
    else
        document.getElementById("previsualizacion").value = "false";

    
}

function changePrev_det()
{

    var valor_det = document.getElementById("prev_det").value;
    console.log(valor_det);
    if(valor_det=="false") 
        document.getElementById("prev_det").value = "true";
    else
        document.getElementById("prev_det").value = "false";

   

}

function changePrev_vig()
{

    var valor_vig = document.getElementById("prev_vig").value;
    console.log(valor_vig);
    if(valor_vig=="false") 
        document.getElementById("prev_vig").value = "true";
    else
        document.getElementById("prev_vig").value = "false";

   

}

function changePrev_pri()
{
    

    var valor_pri = document.getElementById("prev_pri").value;
    console.log(valor_pri);
    if(valor_pri=="false") 
        document.getElementById("prev_pri").value = "true";
    else
        document.getElementById("prev_pri").value = "false";

}

function traverse(jsonObj) {

   
    if( typeof jsonObj == "object" ) {
       // cont++;
       // console.log("Cont="+cont+", text="+jsonObj.text);

        struct=new Array();
        struct.push(jsonObj.id);
        struct.push(jsonObj.text);
        struct.push(jsonObj.content);
        struct.push(jsonObj.layers);
        

        arrayNormativaRev.push(struct);
        $.each(jsonObj, function(k,v) {
            // k is either an array index or object key
            //console.log("Cont="+cont+", "+k+"="+v);
            
            traverse(v);
        });
    }
    else {
        //
    }
}

/*
async function articulos_normativaREV(){

    //console.log("tabla="+tabla+","+fid);

    var tableName=tabla;

   // var filtroSQL="tabla='"+tableName+"' order by articulo ";
    var filtroSQL="tabla='"+tableName+"'";
    let url = new URL("http://"+serverPath+"/infoquery_fase1");
    const params = {tabla: "revision_articulos", filtro: filtroSQL};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    let response = await fetch(url,dataRequest);
    //console.log(response);
    let info_geojson = await response.json();
    //console.log(info_geojson);

    // var arrayArticulos = new Array(); 

     //arrayArticulos=[];

     var arrayFeatures=[]; 
    for(var n=0;n<info_geojson.features.length;n++){

        //console.log(info_geojson.features[n].properties.articulo);

        var filtroSQ="";
        if(info_geojson.features[n].properties.filtro!="" && info_geojson.features[n].properties.filtro!=null)
            filtroSQL="fid="+fid+" and ("+info_geojson.features[n].properties.filtro+")";
        else
            filtroSQL="fid="+fid;

        let url = new URL("http://"+serverPath+"/infoquery_fase1");
        const params = {tabla: tableName, filtro: filtroSQL};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        let response2 = await fetch(url,dataRequest);
        //console.log(response2);
        let info_geojson2 = await response2.json();
    
       
        if(info_geojson2.features!=null){
          // console.log(info_geojson.features[n].properties.articulo+" "+info_geojson.features[n].properties.titulo);
           arrayFeatures.push(info_geojson.features[n]);
          // arrayArticulos.push([info_geojson.features[n],contDiv]);
          // console.log(info_geojson.features[n].properties.titulo);
        } 

    }
    if(arrayFeatures.length>0){
        arrayArticulos.push(arrayFeatures);

        console.log("articulos length==="+arrayFeatures.length);
 
        showDialogNormativa(arrayArticulos);

    }

    
    
   
    
} */