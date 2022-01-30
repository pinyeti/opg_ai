        function deleteChildrenNormativa(nodeid)
        {

            var node=$('#jstree_normativa').jstree().get_node(nodeid);

            console.log("children",node.children);
            children=node.children


            for(var p=0;p<children.length;p++){

                var index=999;
                for(var r=0;r<layersMapNormativa.length;r++){
                   if(layersMapNormativa[r][0]==children[p]){
                       index=r;            
                   }
                }
                if(index!=999){
                    map.removeLayer(layersMapNormativa[index][1]);
                    layersMapNormativa.splice(index,1); 
               }
            }



        }

        function deleteSelectedNormativa()
        {
            console.log("ver array normativa")
            for(var n=0;n<layersMapNormativa.length;n++) console.log(layersMapNormativa[n]);
            // $( function() {
            var nodes=$("#jstree_normativa").jstree('get_selected')
            console.log(nodes[0]);
            console.log(nodes[1]);
            console.log(nodes[2]);
           // $("#jstree_normativa").jstree("remove",nodes[0]);

          for(var p=0; p<nodes.length;p++){ 
           if(nodes[p]!="root"){
                deleteChildrenNormativa(nodes[p]);
                $('#jstree_normativa').jstree().delete_node([nodes[p]]);
                
                var index=999;
               for(var n=0;n<layersMapNormativa.length;n++){
                   if(layersMapNormativa[n][0]==nodes[p]){
                       index=n;
                       
                   }
               }
               if(index!=999){
                    map.removeLayer(layersMapNormativa[index][1]);
                    layersMapNormativa.splice(index,1); 
               }
           }
          }
           for(var n=0;n<layersMapNormativa.length;n++) console.log(layersMapNormativa[n]);
           // $('#jstree_normativa').jstree("refresh");     
            // });
        }


        function deleteChildrenConsultas(nodeid)
        {

            var node=$('#jstree_consultas').jstree().get_node(nodeid);

            console.log("children",node.children);
            children=node.children


            for(var p=0;p<children.length;p++){

                var index=999;
                for(var r=0;r<layersMapConsultas.length;r++){
                   if(layersMapConsultas[r][0]==children[p]){
                       index=r;            
                   }
                }
                if(index!=999){
                    map.removeLayer(layersMapConsultas[index][1]);
                    layersMapConsultas.splice(index,1); 
               }
            }



        }

        function deleteSelectedConsultas_vig()
        {
            console.log("ver array Consultas")
        }

        function deleteSelectedConsultas()
        {
            console.log("ver array Consultas")
            for(var n=0;n<layersMapConsultas.length;n++) console.log(layersMapConsultas[n]);
            // $( function() {
            var nodes=$("#jstree_consultas").jstree('get_selected')
            console.log(nodes[0]);
            console.log(nodes[1]);
            console.log(nodes[2]);
           // $("#jstree_normativa").jstree("remove",nodes[0]);

          for(var p=0; p<nodes.length;p++){ 
           if(nodes[p]!="99"){
                deleteChildrenConsultas(nodes[p]);
                $('#jstree_consultas').jstree().delete_node([nodes[p]]);
                
                var index=999;
               for(var n=0;n<layersMapConsultas.length;n++){
                   if(layersMapConsultas[n][0]==nodes[p]){
                       index=n;
                       
                   }
               }
               if(index!=999){
                    map.removeLayer(layersMapConsultas[index][1]);
                    layersMapConsultas.splice(index,1); 
               }
           }
          }
           for(var n=0;n<layersMapConsultas.length;n++) console.log(layersMapConsultas[n]);
           // $('#jstree_normativa').jstree("refresh");     
            // });
        }


        function createTreeOrdenacion_vig()
        {
            var htmtree1=`<div id="html1">
            <ul>
              <li>Root node 1</li>
              <li>Root node 2</li>
            </ul>
          </div>`

          $(function() {

            $('#html1').jstree();
          });

            $(function() {

                $('#html1').jstree();

                $('#jstree_ordenacion').jstree({ 
                    'core' :
                     {
                        'data' : [
                            {
                                "id": "root",
                                'text' : 'Plans de Ordenació / Cadastre',
                                'state' : {
                                    'opened' : true,
                                    'selected' : true,
                                    'checked' : false
                                },
                                'children' : [
                                    { "id": 1,'text' : 'Cadastre','data' : catastro, state:{'checked' : false} },
                                    { "id": 2,'text' : 'Plà General Vigent' ,'data' : planeamiento, state:{'checked' : true}},
                                 
                                  
                                   
                                   // { "id": 3,'text' : 'Revisió Plà General<br><ul><li>paix</li><li>paix2</li></ul' ,'data' : revision_fase1, state:{'checked' : true}}
                                ]
                            }
                        ],
                        "check_callback" :  function (operation, node, node_parent, node_position, more) {  
                            if (operation === "move_node") {  
                                  return true 
                            }
                        },  
                       
                   
                    },
                     'checkbox' : {
                            three_state : true, 
                            whole_node : false,
                            tie_selection : false,
                            cascade: false
                        },
                    
                    "plugins" : [ "dnd","checkbox" ,"wholerow"]
                   
                })

                

                function traverseOrdenacionCheck(id) {

                    var node = $('#jstree_ordenacion').jstree(true).get_node(id)

                    if( typeof node == "object" ) {
                  
                        if(node.data!=null) node.data.addTo(map);
                     
                        children=node.children;
                    
                        $.each(children, function(k,v) {
            
                            traverseOrdenacionCheck(v);
                        });
                    }
                  
                }

                function traverseOrdenacionUnCheck(id) {

                    var node = $('#jstree_ordenacion').jstree(true).get_node(id)

                    if( typeof node == "object" ) {
                  
                        if(node.data!=null)  map.removeLayer(node.data);
                     
                        children=node.children;
                    
                        $.each(children, function(k,v) {
            
                            traverseOrdenacionUnCheck(v);
                        });
                    }
                  
                }

                 $('#jstree_ordenacion').on("select_node.jstree", function (e, data) {
                 
                   // opacityOrd=ordenacion[data.node.id].options.opacity;

                    opacityOrd=data.node.data.options.opacity;

                    $( "#sliderOrdenacion" ).slider( "value" ,opacityOrd*100);
                  
                })

                $('#jstree_ordenacion').on("check_node.jstree", function (e, data) {

                    traverseOrdenacionCheck(data.node.id)

                })

                $('#jstree_ordenacion').on("uncheck_node.jstree", function (e, data) {

                    traverseOrdenacionUnCheck(data.node.id)
                  
                })

            }) 

            

        }

        function changeTextnode(node,mode){

            switch(node){
                case 2:
                    if(mode=="hide")
                        $("#jstree_ordenacion").jstree('rename_node', node , `Plà General Vigent  <button style="padding:1px" class="ui-button ui-widget ui-corner-all" title="Mostrar Leyenda" OnClick="changeTextnode(2,'show')"><i class="fa fa-sort-down"></i></button>` ); 
                    if(mode=="show")
                        $("#jstree_ordenacion").jstree('rename_node', node , `Plà General Vigent  <button style="padding:1px" class="ui-button ui-widget ui-corner-all" title="Ocultar Leyenda" OnClick="changeTextnode(2,'hide')"><i class="fa fa-sort-up"></i></button><br><ul><li>&nbsp&nbsp&nbsp<img src="/images/legends/leyenda_vigente.png"><li></ul>` ); 
                    break;
                case 3:
                    if(mode=="hide")
                        $("#jstree_ordenacion").jstree('rename_node', node , `Revisió Plà General  <button style="padding:1px" class="ui-button ui-widget ui-corner-all" title="Mostrar Leyenda" OnClick="changeTextnode(3,'show')"><i class="fa fa-sort-down"></i></button>` ); 
                    if(mode=="show")
                        $("#jstree_ordenacion").jstree('rename_node', node , `Revisió Plà General  <button style="padding:1px" class="ui-button ui-widget ui-corner-all" title="Ocultar Leyenda" OnClick="changeTextnode(3,'hide')"><i class="fa fa-sort-up"></i></button> <br>&nbsp&nbsp&nbsp<img src="/images/legends/leyenda_revision2.png">` ); 
                    break;
            }
        }

        function createTreeOrdenacion()
        {
            var htmtree1=`<div id="html1">
            <ul>
              <li>Root node 1</li>
              <li>Root node 2</li>
            </ul>
          </div>`

          $(function() {

            $('#html1').jstree();
          });

            $(function() {

                $('#html1').jstree();

                $('#jstree_ordenacion').jstree({ 
                    'core' :
                     {
                        'data' : [
                            {
                                "id": "root",
                                'text' : 'Plans de Ordenació / Cadastre',
                                'state' : {
                                    'opened' : true,
                                    'selected' : true,
                                    'checked' : false
                                },
                                'children' : [
                                    { "id": 1,'text' : 'Cadastre','data' : catastro, state:{'checked' : false,"disabled": false} },
                                    {"id": 11,'text' : 'Base topográfica','data' : cartografia_imi, state:{'checked' : true,"disabled": false} },
                                   
                                   

                                    { "id": 3,
                                        'text' : 'Revisió Pla General',
                                        //'data' : revision_fase1, 
                                        state:{'checked' : false},
                                        'children' : [
                                           
                                             { "id": "3_1",
                                                'text' : 'Clasificació del Sòl',
                                                'data' : clasificacion_suelo, 
                                                'icon' : 'images/legends/RV_CLAS_SUELO.png',
                                                state:{'checked' : false},
                                                'children' : [
                                                    {"id": "3_1_1",'text' : '<Label style="font-size:8pt"><i>(SU) Sòl Urbà</Label>','icon' : 'images/legends/RV_SU_CLAS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_1_2",'text' : '<Label style="font-size:8pt"><i>(SUB) Sòl Urbanitzable</i></Label>','icon' : 'images/legends/RV_SUB_CLAS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_1_3",'text' : '<Label style="font-size:8pt"><i>(SR) Sòl Rùstic</i></Label>','icon' : 'images/legends/RV_SR_CLAS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                   
                                                ]
                                            }, 
                                            { "id": "3_2",
                                                'text' : 'Categories Sòl Rùstic',
                                                'data' : categorias_rustico, 
                                                'icon' : 'images/legends/RV_CATEG_SR.png',
                                                state:{'checked' : true},
                                                'children' : [
                                                    {"id": "n66",'text' : '<Label style="font-size:8pt"><i>(AANP) Àrees naturals d`especial interès d`alt nivell de protecció</i></Label>','icon' : 'images/legends/RV_AANP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n67",'text' : '<Label style="font-size:8pt"><i>(ANEI) Àrees naturals d`especial interès</i></Label>','icon' : 'images/legends/RV_ANEI.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n68",'text' : '<Label style="font-size:8pt"><i>(AIN-PG) Àrees d`interes natural per planejament general</i></Label>','icon' : 'images/legends/RV_AIN.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n69",'text' : '<Label style="font-size:8pt"><i>(ZIP) Zones de Interés pasajistic protegides per planejament general</i></Label>','icon' : 'images/legends/RV_ZIP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n70",'text' : '<Label style="font-size:8pt"><i>(ARIP) Àrees rurals d`interès paisatgistic</i></Label>','icon' : 'images/legends/RV_ARIP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n71",'text' : '<Label style="font-size:8pt"><i>(SRG) Àrees de sòl rústic de regim general</i></Label>','icon' : 'images/legends/RV_SRG.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n72",'text' : '<Label style="font-size:8pt"><i>(AIA) Àrees de interes agrari</i></Label>','icon' : 'images/legends/RV_AIA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n73",'text' : '<Label style="font-size:8pt"><i>(AT-H) Àrees de transició, d´harmonització </i></Label>','icon' : 'images/legends/RV_AT-H.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n74",'text' : '<Label style="font-size:8pt"><i>(NR) Nucli rural</i></Label>','icon' : 'images/legends/RV_NR.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                              
                                                ]
                                            }, 
                                             { "id": "3_3",
                                                'text' : 'Qualificacions',
                                                'data' : calificaciones, 
                                                'icon' : 'images/legends/RV_CALIF_SU.png',
                                                state:{'checked' : true},
                                                'children' : [
                                                    {"id": "n77",'text' : '<Label style="font-size:8pt"><i>(A) Residencial Plurifamiliar Eixample. AV-MC.V.</i></Label>','icon' : 'images/legends/RV_A.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n84",'text' : '<Label style="font-size:8pt"><i>(B) Residencial Plurifamiliar Eixample Perifèric. AV-MC.V.</i></Label>','icon' : 'images/legends/RV_B.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n85",'text' : '<Label style="font-size:8pt"><i>(C) Residencial Plurifamiliar Eixos Cívics. AV-MC.V.</i></Label>','icon' : 'images/legends/RV_C.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n86",'text' : '<Label style="font-size:8pt"><i>(D) Residencial Plurifamiliar en illa tancada reculada. AV-MC.R.</i></Label>','icon' : 'images/legends/RV_D.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n87",'text' : '<Label style="font-size:8pt"><i>(E) Residencial Plurifamiliar Ordenació Oberta. RP.A.</i></Label>','icon' : 'images/legends/RV_E.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n88",'text' : '<Label style="font-size:8pt"><i>(F) Ordenació volumètrica específica (residencial plurifamiliar o terciari. VE)</i></Label>','icon' : 'images/legends/RV_F.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n89",'text' : '<Label style="font-size:8pt"><i>(G) Residencial Plurifamiliar amb tipologies mixtes. RP. S.</i></Label>','icon' : 'images/legends/RV_G.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n90",'text' : '<Label style="font-size:8pt"><i>(H) Residencial Plurifamiliar MC reculada amb porxos. AV-MC.R.</i></Label>','icon' : 'images/legends/RV_H.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n91",'text' : '<Label style="font-size:8pt"><i>(I) Residencial Unifamiliar aïllada de baixa densitat. RP.A.</i></Label>','icon' : 'images/legends/RV_I.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n92",'text' : '<Label style="font-size:8pt"><i>(J) Residencial Unifamiliar Suburbana. RP.S.</i></Label>','icon' : 'images/legends/RV_J.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n93",'text' : '<Label style="font-size:8pt"><i>(K) Residencial Unifamiliar entre mitgeres. AV-MC.R.</i></Label>','icon' : 'images/legends/RV_K.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n94",'text' : '<Label style="font-size:8pt"><i>(L) Industrial. Ús productiu en trama residencial. RP.A.</i></Label>','icon' : 'images/legends/RV_L.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n95",'text' : '<Label style="font-size:8pt"><i>(M) Industrial. Ús productiu en Polígons Industrials. RP.A.</i></Label>','icon' : 'images/legends/RV_M.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n96",'text' : '<Label style="font-size:8pt"><i>(N) Preservació ambiental N.</i></Label>','icon' : 'images/legends/RV_N.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n97",'text' : '<Label style="font-size:8pt"><i>(R) Preservació arquitectònica ambiental R.</i></Label>','icon' : 'images/legends/RV_R.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n98",'text' : '<Label style="font-size:8pt"><i>(S) Terciari en edificació aïllada (Comercial/Administratiu). RP.A.</i></Label>','icon' : 'images/legends/RV_S.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n99",'text' : '<Label style="font-size:8pt"><i>(T) Turístic en edificació aïllada. RP.A.</i></Label>','icon' : 'images/legends/RV_T.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n100",'text' : '<Label style="font-size:8pt"><i>(D_Pl) Edificació residencial entre mitgeres en Platja Palma</i></Label>','icon' : 'images/legends/RV_PL_D.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n101",'text' : '<Label style="font-size:8pt"><i>(E_Pl) Habitatge Plurifamiliar aïllat en Platja Palma</i></Label>','icon' : 'images/legends/RV_PL_E.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n102",'text' : '<Label style="font-size:8pt"><i>(VT_Pl) Habitatge Tradicional en Platja de Palma</i></Label>','icon' : 'images/legends/RV_PL_VT.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n103",'text' : '<Label style="font-size:8pt"><i>(VA_Pl) Habitatge Unifamiliar adossats en Platja de Palma</i></Label>','icon' : 'images/legends/RV_PL_VA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n104",'text' : '<Label style="font-size:8pt"><i>(I_Pl) Habitatge Unifamiliar en Platja Palma</i></Label>','icon' : 'images/legends/RV_PL_I.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n105",'text' : '<Label style="font-size:8pt"><i>(S_Pl) Comercial i Serveis en Platja de Palma</i></Label>','icon' : 'images/legends/RV_PL_S.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n106",'text' : '<Label style="font-size:8pt"><i>(T_Pl) Turístic en Platja de Palma</i></Label>','icon' : 'images/legends/RV_PL_T.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n107",'text' : '<Label style="font-size:8pt"><i>(TH_Pl) Turístic Hoteler en Platja de Palma</i></Label>','icon' : 'images/legends/RV_PL_TH.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    { "id": "3_3_1",
                                                        'text' : 'Sistemes dotacionals',
                                                       // 'data' : categorias_rustico, 
                                                        'icon' : 'images/legends/RV_SISTEMAS.png',
                                                        "a_attr": {"class":"no_checkbox"},
                                                        //state:{'checked' : true},
                                                        'children' : [
                                                            {"id": "3_3_1_1",'text' : '<Label style="font-size:8pt"><i>(SLEC) Equipament Comunitari (S.Local)</i></Label>','icon' : 'images/legends/RV_SLEC.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_2",'text' : '<Label style="font-size:8pt"><i>(SLEL) Espai Lliure (S.Local)</i></Label>','icon' : 'images/legends/RV_SLEL.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_3",'text' : '<Label style="font-size:8pt"><i>(SLC) Comunicacions (S.Local)</i></Label>','icon' : 'images/legends/RV_SLC.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_4",'text' : '<Label style="font-size:8pt"><i>(SLIF) Infraestructures (S.Local)</i></Label>','icon' : 'images/legends/RV_SLIF.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_5",'text' : '<Label style="font-size:8pt"><i>(SLSU) Serveis Urbans (S.Local)</i></Label>','icon' : 'images/legends/RV_SLSU.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_6",'text' : '<Label style="font-size:8pt"><i>(SGEC) Equipament Comunitari (S.General)</i></Label>','icon' : 'images/legends/RV_SGEC.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_7",'text' : '<Label style="font-size:8pt"><i>(SGEL) Espai Lliure (S.General)</i></Label>','icon' : 'images/legends/RV_SGEL.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_8",'text' : '<Label style="font-size:8pt"><i>(SGC) Comunicacions (S.General)</i></Label>','icon' : 'images/legends/RV_SGC.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_9",'text' : '<Label style="font-size:8pt"><i>(SGIF) Infraestructures (S.General)</i></Label>','icon' : 'images/legends/RV_SGIF.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_3_1_10",'text' : '<Label style="font-size:8pt"><i>(SGSU) Serveis Urbans (S.General)</i></Label>','icon' : 'images/legends/RV_SGSU.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            
                                                        ]
                                                    }, 
                                                    {"id": "3_3_2",'text' : '<Label style="font-size:8pt"><i>(EL0) Espai Lliure Privat</i></Label>','icon' : 'images/legends/RV_EL0.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},         
                                                    {"id": "3_3_3",'text' : '<Label style="font-size:8pt"><i>(CAT) Catalegs</i></Label>','icon' : 'images/legends/RV_CAT.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_3_4",'text' : '<Label style="font-size:8pt"><i>(r) Preservació</i></Label>','icon' : 'images/legends/RV_PRESERV_r.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_3_5",'text' : '<Label style="font-size:8pt"><i>Carencia Infraestructura</i></Label>','icon' : 'images/legends/RV_CARENCIA_IF.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},         
                                                    {"id": "3_3_6",'text' : '<Label style="font-size:8pt"><i>Pasatge</i></Label>','icon' : 'images/legends/RV_PASAJE.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_3_7",'text' : '<Label style="font-size:8pt"><i>Nova Alineació</i></Label>','icon' : 'images/legends/RV_NA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_3_8",'text' : '<Label style="font-size:8pt"><i>Profunditat edificable</i></Label>','icon' : 'images/legends/RV_PROF_EDIF.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_3_9",'text' : '<Label style="font-size:8pt"><i>Separació qualificació</i></Label>','icon' : 'images/legends/RV_SEPARACION_CALIFIC.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_3_10",'text' : '<Label style="font-size:8pt"><i>Separació alçada</i></Label>','icon' : 'images/legends/RV_SEPARACION_ALTURAS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                   
                                                ]
                                            },         
                                            
                                            { "id": "3_4",
                                                'text' : 'Àmbits',
                                                'data' : ambitos_ai, 
                                                'icon' : 'images/legends/RV_SG_SR.png',
                                                state:{'checked' : true},
                                                'children' : [
                                                    {"id": "3_4_1",'text' : '<Label style="font-size:8pt"><i>(ZRE) Zones Regulació especifica</i></Label>','icon' : 'images/legends/RV_ZRE.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_4_2",'text' : '<Label style="font-size:8pt"><i>(API) Arees Planejament Incorporat</i></Label>','icon' : 'images/legends/RV_API.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    { "id": "3_4_3",
                                                        'text' : '(ATU) Actuacions Transformació Urbana',
                                                       // 'data' : categorias_rustico, 
                                                        'icon' : 'images/legends/RV_ATU.png',
                                                        "a_attr": {"class":"no_checkbox"},
                                                        //state:{'checked' : true},
                                                        'children' : [
                                                            {"id": "3_4_3_1",'text' : '<Label style="font-size:8pt"><i>(ARU) Actuació de renovació urbana.</i></Label>','icon' : 'images/legends/RV_ATU.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_4_3_2",'text' : '<Label style="font-size:8pt"><i>(AD) Actuació de dotació.</i></Label>','icon' : 'images/legends/RV_ATU.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_4_3_3",'text' : '<Label style="font-size:8pt"><i>(ARI-PE) Actuació de reforma interior.</i></Label>','icon' : 'images/legends/RV_ARI.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            {"id": "3_4_3_4",'text' : '<Label style="font-size:8pt"><i>(AA) Actuació aillada.</i></Label>','icon' : 'images/legends/RV_AA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                           
                                                        ]
                                                    }, 
                                                    {"id": "3_4_4",'text' : '<Label style="font-size:8pt"><i>(NT) Nuclis Tradicionals</i></Label>','icon' : 'images/legends/RV_NT.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},                 
                                                    {"id": "3_4_5",'text' : '<Label style="font-size:8pt"><i>(SUB) Actuacions en Sol Urbanitzable</i></Label>','icon' : 'images/legends/RV_SUB.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_4_6",'text' : '<Label style="font-size:8pt"><i>(SU) Delimitació Sòl Urbà</i></Label>','icon' : 'images/legends/RV_SU.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "3_4_7",'text' : '<Label style="font-size:8pt"><i>(SU) Delimitació Terme Municipal</i></Label>','icon' : 'images/legends/RV_TM.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                  
                                                ]
                                                
                                            },   
                                          /*  { "id": 8,
                                                'text' : 'Catalegs',
                                                'data' : catalogos, 
                                                'icon' : 'images/legends/RV_CAT.png',
                                                state:{'checked' : true},
                                                
                                            },   */   
                                            { "id": 9,
                                                'text' : '(APT) Àrees de protecció territorial.',
                                                'data' : apt_rev, 
                                                'icon' : 'images/legends/RV_APT_GRUPO.png',
                                                state:{'checked' : false},
                                                'children' : [
                                                    {"id": "n75",'text' : '<Label style="font-size:8pt"><i>(APT-L) Litoral</Label>','icon' : 'images/legends/RV_APT_L.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n76",'text' : '<Label style="font-size:8pt"><i>(APT-C) Carreteres</i></Label>','icon' : 'images/legends/RV_APT_C.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                   
                                                ]
                                            }, 
                                            { "id": "3_6",
                                            'text' : '(APT) Altres Afeccions.',
                                            'data' : apt_otras, 
                                            'icon' : 'images/legends/RV_APT_OTROS.png',
                                            state:{'checked' : false},
                                            'children' : [
                                                { "id": "3_6_1",
                                                    'text' : 'PROTECCIÓ LITORAL',
                                                   // 'data' : categorias_rustico, 
                                                     'icon' : 'images/legends/RV_APT_DPMT.png',
                                                    "a_attr": {"class":"no_checkbox"},
                                                    //state:{'checked' : true},
                                                    'children' : [
                                                        {"id": "3_6_1_1",'text' : '<Label style="font-size:8pt"><i>(APT-DPMT) Domini Públic Marítim Terrestre</Label>','icon' : 'images/legends/RV_APT_DPMT.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                        {"id": "3_6_1_2",'text' : '<Label style="font-size:8pt"><i>(APT-LIL) Línia influència del Litoral</Label>','icon' : 'images/legends/RV_APT_LIL.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            
                                                    ]
                                                }, 
                                               // {"id": "3_6_1",'text' : '<Label style="font-size:8pt"><i>(APT-DPMT) Domini Públic Marítim Terrestre</Label>','icon' : 'images/legends/RV_APT_DPMT.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                               // {"id": "3_6_2",'text' : '<Label style="font-size:8pt"><i>(APT-LIL) Línia influència del Litoral</Label>','icon' : 'images/legends/RV_APT_LIL.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                {"id": "3_6_2",'text' : '<Label style="font-size:8pt"><i>Zona de servitud de protecció</Label>','icon' : 'images/legends/RV_ZONA_SERVIDUMBRE.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                {"id": "3_6_3",'text' : '<Label style="font-size:8pt"><i>Límit Tránsit</Label>','icon' : 'images/legends/RV_LIMITE_TRANSITO.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                { "id": "3_6_4",
                                                    'text' : 'AEROPORTS',
                                                  //  'data' : categorias_rustico, 
                                                     'icon' : 'images/legends/RV_CAUTELA_AEROPORTUARIA.png',
                                                    "a_attr": {"class":"no_checkbox"},
                                                    //state:{'checked' : true},
                                                    'children' : [
                                                        {"id": "3_6_4_1",'text' : '<Label style="font-size:8pt"><i>Àrea cautela aeroportuària</Label>','icon' : 'images/legends/RV_CAUTELA_AEROPORTUARIA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                        {"id": "3_6_4_2",'text' : '<Label style="font-size:8pt"><i>S.G Aeroportuàri. Zona de Servei</Label>','icon' : 'images/legends/RV_AG_A_ZS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                            
                                                    ]
                                                }, 
                                               // {"id": "3_6_5",'text' : '<Label style="font-size:8pt"><i>Àrea cautela aeroportuària</Label>','icon' : 'images/legends/RV_CAUTELA_AEROPORTUARIA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                               // {"id": "3_6_6",'text' : '<Label style="font-size:8pt"><i>S.G Aeroportuàri. Zona de Servei</Label>','icon' : 'images/legends/RV_AG_A_ZS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                {"id": "3_6_5",'text' : '<Label style="font-size:8pt"><i>(APT-C) Reserva</Label>','icon' : 'images/legends/RV_APT_C_RESERVA.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                { "id": "3_6_6",
                                                    'text' : 'PROTECCIÓ DOMINI PÚBLIC HIDRAULIC',
                                                  //  'data' : categorias_rustico, 
                                                     'icon' : 'images/legends/RV_APT_DPH_ZP.png',
                                                    "a_attr": {"class":"no_checkbox"},
                                                    //state:{'checked' : true},
                                                    'children' : [
                                                        {"id": "3_6_6_1",'text' : '<Label style="font-size:8pt"><i>(APT-DPH-ZP) Zona de Policia</Label>','icon' : 'images/legends/RV_APT_DPH_ZP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                        {"id": "3_6_6_2",'text' : '<Label style="font-size:8pt"><i>(APT-DPH-ZP) Zona de Servidumbre</Label>','icon' : 'images/legends/RV_APT_DPH_ZS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                        
                                                    ]
                                                }, 
                                               // {"id": "3_6_8",'text' : '<Label style="font-size:8pt"><i>(APT-DPH-ZP) Zona de Policia</Label>','icon' : 'images/legends/RV_APT_DPH_ZP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                               // {"id": "3_6_9",'text' : '<Label style="font-size:8pt"><i>(APT-DPH-ZP) Zona de Servidumbre</Label>','icon' : 'images/legends/RV_APT_DPH_ZS.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                { "id": "3_6_7",
                                                    'text' : 'PROTECCIÓ DOMINI PÚBLIC HIDRAULIC',
                                                  //  'data' : categorias_rustico, 
                                                        'icon' : 'images/legends/RV_APT_F_LE.png',
                                                    "a_attr": {"class":"no_checkbox"},
                                                    //state:{'checked' : true},
                                                    'children' : [
                                                        {"id": "3_6_7_1",'text' : '<Label style="font-size:8pt"><i>(APT-F-LE) Límit d`edificació ferroviari</Label>','icon' : 'images/legends/RV_APT_F_LE.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                        {"id": "3_6_7_2",'text' : '<Label style="font-size:8pt"><i>(APT-F-LP) Límit de protecció ferroviari</Label>','icon' : 'images/legends/RV_APT_F_LP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                             
                                                    ]
                                                }, 
                                               // {"id": "3_6_10",'text' : '<Label style="font-size:8pt"><i>(APT-F-LE) Límit d`edificació ferroviari</Label>','icon' : 'images/legends/RV_APT_F_LE.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                               // {"id": "3_6_11",'text' : '<Label style="font-size:8pt"><i>(APT-F-LP) Límit de protecció ferroviari</Label>','icon' : 'images/legends/RV_APT_F_LP.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                { "id": "3_6_8",
                                                    'text' : 'PROTECCIÓ AERONAUTICA',
                                                 //   'data' : categorias_rustico, 
                                                        'icon' : 'images/legends/RV_APT_A_A.png',
                                                    "a_attr": {"class":"no_checkbox"},
                                                    //state:{'checked' : true},
                                                    'children' : [
                                                        {"id": "3_6_8_1",'text' : '<Label style="font-size:8pt"><i>(APT-A-A) Envoltant de servitud acústica actual</Label>','icon' : 'images/legends/RV_APT_A_A.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                        {"id": "3_6_8_2",'text' : '<Label style="font-size:8pt"><i>(APT-A-P) Envoltant de servitud acústica proposta</Label>','icon' : 'images/legends/RV_APT_A_P.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                               
                                                    ]
                                                }, 
                                               // {"id": "3_6_12",'text' : '<Label style="font-size:8pt"><i>(APT-A-A) Envoltant de servitud acústica actual</Label>','icon' : 'images/legends/RV_APT_A_A.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                               // {"id": "3_6_13",'text' : '<Label style="font-size:8pt"><i>(APT-A-P) Envoltant de servitud acústica proposta</Label>','icon' : 'images/legends/RV_APT_A_P.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                
                                            ]
                                        }, 

                                            { "id": 10,
                                                'text' : '(APR) Àrees de prevenció de riscos. ',
                                                'data' : apr_rev, 
                                                'icon' : 'images/legends/RV_APR_GRUPO.png',
                                                state:{'checked' : false},
                                                'children' : [
                                                    {"id": "n78",'text' : '<Label style="font-size:8pt"><i>(APR-CN) Zona de prevenció de risc de contaminació d´aqüífers.</Label>','icon' : 'images/legends/RV_APR_CN.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n79",'text' : '<Label style="font-size:8pt"><i>(APR-ER) Zona de previsió de risc d´erosió.</i></Label>','icon' : 'images/legends/RV_APR_ER.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n80",'text' : '<Label style="font-size:8pt"><i>(APR-ES) Zona de prevenció de risc d´esllavissaments.</Label>','icon' : 'images/legends/RV_APR_ES.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n81",'text' : '<Label style="font-size:8pt"><i>(APR-IF) Àrees de prevenció de risc d´incendi forestal.</i></Label>','icon' : 'images/legends/RV_APR_IF.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n82",'text' : '<Label style="font-size:8pt"><i>(APR-IN_G) Àrees de previsió de risc d´inundació.</Label>','icon' : 'images/legends/RV_APR_IN_G.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                    {"id": "n83",'text' : '<Label style="font-size:8pt"><i>(APR-IN_T500) Àrees de previsió de risc d´inundació.</i></Label>','icon' : 'images/legends/RV_APR_IN_T500.png',"a_attr": {"class":"no_checkbox"},state:{'selected' : false}},
                                                   
                                                ]
                                            }, 
                                            //{"id": 12,'text' : 'Sa Gerreria (Proposta','data' : sa_gerreria, state:{'checked' : false,"disabled": false} }, 
                                            
                                           

                                           

                                                        
                                        ]
                                    },
                                  
                                  /*  { "id": 2,'text' : 'Plà General Vigent  '+
                                    `<button style="padding:1px" class="ui-button ui-widget ui-corner-all" title="Mostar Leyenda" OnClick="changeTextnode(2,'show')"><i class="fa fa-sort-down"></i></button>` ,'data' :  planeamiento, state:{'checked' : true}},
      
                                   
                                    { "id": 3,'text' : 'Revisió Plà General  '+
                                                        `<button style="padding:1px" class="ui-button ui-widget ui-corner-all" title="Mostar Leyenda" OnClick="changeTextnode(3,'show')"><i class="fa fa-sort-down"></i></button>` ,'data' : revision_fase1, state:{'checked' : true}} */
                                ]
                            }
                        ],
                        "check_callback" :  function (operation, node, node_parent, node_position, more) {  
                            if (operation === "move_node") {  
                                  return true 
                            }
                        },  
                       
                   
                    },
                     'checkbox' : {
                            three_state : true, 
                            whole_node : false,
                            tie_selection : false,
                            cascade: false
                        },
                    
                    // "plugins" : [ "dnd","checkbox" ]
                    "plugins" : [ "checkbox" ]
                   
                })

                

                function traverseOrdenacionCheck(id) {

                    var node = $('#jstree_ordenacion').jstree(true).get_node(id)

                    if( typeof node == "object" ) {
                  
                        if(node.data!=null) node.data.addTo(map);
                     
                        children=node.children;
                    
                        $.each(children, function(k,v) {
            
                            traverseOrdenacionCheck(v);
                        });
                    }
                  
                }

                function traverseOrdenacionUnCheck(id) {

                    var node = $('#jstree_ordenacion').jstree(true).get_node(id)

                    if( typeof node == "object" ) {
                  
                        if(node.data!=null)  map.removeLayer(node.data);
                     
                        children=node.children;
                    
                        $.each(children, function(k,v) {
            
                            traverseOrdenacionUnCheck(v);
                        });
                    }
                  
                }

                 $('#jstree_ordenacion').on("select_node.jstree", function (e, data) {
                 
                   // opacityOrd=ordenacion[data.node.id].options.opacity;
                   console.log(data.node.id)
                   

                    if(data.node.id.substring(0,1)!="n"){
                        opacityOrd=data.node.data.options.opacity;
                        $( "#sliderOrdenacion" ).slider( "value" ,opacityOrd*100);
                    }else{
                        $('#jstree_ordenacion').jstree(true).deselect_node(data.node);  
                    }
                  
                })

                $('#jstree_ordenacion').on("check_node.jstree", function (e, data) {

                    traverseOrdenacionCheck(data.node.id)

                })

                $('#jstree_ordenacion').on("uncheck_node.jstree", function (e, data) {

                    traverseOrdenacionUnCheck(data.node.id)
                  
                })

                $("#jstree_ordenacion").bind("loaded.jstree", function(event, data) {
                    console.log("loaded ordenacion")
                    console.log($("#jstree_ordenacion").jstree().get_node("2"))
                   // var currentNode = data.rslt.obj.attr("id");

                    $(this).jstree('open_node','3');
                    $(this).jstree('open_node','3_1');
                    $(this).jstree('open_node','3_3_1');
                    $(this).jstree('open_node','3_4_3');
                    $(this).jstree('open_node','3_6_1');
                    $(this).jstree('open_node','3_6_4');
                    $(this).jstree('open_node','3_6_6');
                    $(this).jstree('open_node','3_6_7');
                    $(this).jstree('open_node','3_6_8');
                   // var nodeLevel = data.inst.get_path().length;
                   // if(nodeLevel == 2){
                       // $('#2').find('> a > .jstree-checkbox').remove();
                   // }

                  // $('.root').find('.jstree-checkbox').remove();
                 })

                 $('#jstree_ordenacion').on('ready.jstree', function () {
                   // $("#jstree_ordenacion").jstree().get_node("2").a_attr["class"] = "no_checkbox";
                  
                  
                
                  });

            }) 

            

        }

        function createTreeConsultas()
        {
            $(function() {
                $('#jstree_consultas').jstree({ 

                    'core' :
                     
                     {
                       
                        'data' : [
                            {
                                "id": 99,
                                'text' : 'Consultas',
                                'state' : {
                                    'opened' : true,
                                    'selected' : true,
                                    'checked' : true
                                }
                                
                            }
                        ],
                        "check_callback" :  function (operation, node, node_parent, node_position, more) {  
                            if (operation === "move_node") {  
                                  return true 
                            }
                        },  
                       
                   
                    },
                     'checkbox' : {
                             three_state : true, 
                            whole_node : false,//Used to check/uncheck node only if clicked on checkbox icon, and not on the whole node including label
                            tie_selection : false,
                            cascade: false
                        },
                    
                    
                    "plugins" : [ "checkbox" ,"wholerow"]
                   
                })

                 $('#jstree_consultas').on("select_node.jstree", function (e, data) {

                    for(n=0;n<layersMapConsultas.length;n++){
                        var value=layersMapConsultas[n];
                        if(value[0]==data.node.id){
                            console.log("encontradojstreec")
                            console.log("encontradojstreec=",value[1])
                            console.log("encontradojstreec=",value[1].options);

                            opacityC=value[1].options.fillOpacity;
                            $( "#sliderConsultas" ).slider( "value" ,opacityC*100);

                            colorC=value[1].options.fillColor;
                            console.log("color=",colorC);
                            $("#colorpicker").spectrum("set", colorC);
                        }    
                    } 
                   
                    
                })

                 $('#jstree_consultas').on("check_node.jstree", function (e, data) {
                    for(var p=0;p<data.selected.length;p++){

                        
                        console.log("checkedddddddd=",data.selected[p]);
                        
                        if(data.selected[p]!=99){
                            for(var r=0;r<layersMapConsultas.length;r++){
                                var value=layersMapConsultas[r];
                                console.log("id=,",value[0]);
                                console.log("node=",data.selected[p]);
                                console.log("layer=,",value[1]);
                                if(value[0]==data.selected[p]){
                                    console.log("encontrado")
                                    value[1].addTo(map);
                                }
                            }
                           
                        }else{
                           // console.log("checked 99...",data.selected[p].children.length);
                            for(var q=0;q<data.node.children.length;q++){
                           
                               for(var r=0;r<layersMapConsultas.length;r++){
                                    var value=layersMapConsultas[r];
                                    console.log("idP,",value[0]);
                                    console.log("nodeP=",data.node.children[q]);
                                    console.log("layerP=,",value[1]);
                                    if(value[0]==data.node.children[q]){
                                        console.log("encontrado")
                                        value[1].addTo(map);
                                    }
                                }
                            }
                           

                        } 
                        
                        
                    } 
                    console.log("dataaaaa   checkedd",data.selected);
                })

                $('#jstree_consultas').on("uncheck_node.jstree", function (e, data) {
                   
                    if(data.node.id!=99){
                        console.log("uncheckedd",data.node.id);
                        for(var p=0;p<layersMapConsultas.length;p++){
                            var value=layersMapConsultas[p];
                            console.log("id=,",value[0]);
                            console.log("node=",data.node.id);
                            console.log("layer=,",value[1]);

                            if(value[0]==data.node.id){
                                console.log("encontrado")
                                 map.removeLayer(value[1]);
                            }
                        }
                        
                    }else{
                        for(var p=0;p<data.selected.length;p++){
                            for(var r=0;r<layersMapConsultas.length;r++){
                                var value=layersMapConsultas[r];
                                if(value[0]==data.selected[p]){
                                    console.log("encontrado")
                                    map.removeLayer(value[1]);
                                }

                            }
                            
                        }
                    }
                })

            }) 

        }

        function createTreeNormativa()
        {
            $(function() {
                $('#jstree_normativa').jstree({ 
                    'core' :
                     {
                        'data' :  [
                            {
                                "id": "root",
                                'text' : 'Normes Urbanístiques',
                                //'data' : planeamiento,
                                'state' : {
                                    'opened' : true,
                                    'selected' : true,
                                    'checked' : true,
                                   // 'disabled':true
                                }
                                
                            }
                        ],
                    
                        "check_callback" :  function (operation, node, node_parent, node_position, more) {  
                            if (operation === "move_node") {  
                                  return true 
                            }
                        },  
                       
                   
                    },
                     'checkbox' : {
                             three_state : true, 
                            whole_node : false,//Used to check/uncheck node only if clicked on checkbox icon, and not on the whole node including label
                            tie_selection : false,
                            cascade: false
                        },
                    
                    "plugins" : [ "dnd","checkbox" ,"wholerow"]
                   
                })

                function traverseNormativaCheck(id) {

                    var node = $('#jstree_normativa').jstree(true).get_node(id)

   
                    if( typeof node == "object" ) {
                     //   cont++;
                    // console.log("Cont="+cont+", text="+jsonObj.text);

        
                        console.log(node.text);
                      //  console.log("estadooooooooo ".estado);

                        for(var p=0;p<layersMapNormativa.length;p++){
                            var value=layersMapNormativa[p];
                          //  if(estado=="check")
                                if(value[0]==id) value[1].addTo(map);
                          //  else
                              //  if(value[0]==id) map.removeLayer(value[1]);
                        }



                        children=node.children;
                        
                       // arrayNormativaRev.push(struct);
                        $.each(children, function(k,v) {
                        // k is either an array index or object key
                        //console.log("Cont="+cont+", "+k+"="+v);

                            console.log("v=",v);
                            console.log("k=",k);
            
                            traverseNormativaCheck(v);
                        });
                    }
                   // else {
                    //
                   // }
                }

                function traverseNormativaUnCheck(id) {

                    var node = $('#jstree_normativa').jstree(true).get_node(id)

   
                    if( typeof node == "object" ) {
                     //   cont++;
                    // console.log("Cont="+cont+", text="+jsonObj.text);

        
                        console.log(node.text);
                      //  console.log("estadooooooooo ".estado);

                        for(var p=0;p<layersMapNormativa.length;p++){
                            var value=layersMapNormativa[p];
                          //  if(estado=="check")
                                if(value[0]==id) map.removeLayer(value[1]);
                          //  else
                              //  if(value[0]==id) map.removeLayer(value[1]);
                        }



                        children=node.children;
                        
                       // arrayNormativaRev.push(struct);
                        $.each(children, function(k,v) {
                        // k is either an array index or object key
                        //console.log("Cont="+cont+", "+k+"="+v);

                            console.log("v=",v);
                            console.log("k=",k);
            
                            traverseNormativaUnCheck(v);
                        });
                    }
                   // else {
                    //
                   // }
                }

                 $('#jstree_normativa').on("select_node.jstree", function (e, data) {

                    console.log("select normativa:",data);
                   // data.node.data.addTo(map);
                    for(n=0;n<layersMapNormativa.length;n++){
                        var value=layersMapNormativa[n];
                        if(value[0]==data.node.id){
                            console.log("encontradojstreec")
                            console.log("encontradojstreec=",value[1])
                            console.log("encontradojstreec=",value[1].options);

                            opacityN=value[1].options.fillOpacity;
                            $( "#sliderNormativa" ).slider( "value" ,opacityN*100);

                            colorN=value[1].options.fillColor;
                            console.log("color=",colorN);
                            $("#colorpickerNormativa").spectrum("set", colorN);
                        }    
                    } 
                   
                    
                })


                 $('#jstree_normativa').on("check_node.jstree", function (e, data) {

                     traverseNormativaCheck(data.node.id)
                
                })

                $('#jstree_normativa').on("uncheck_node.jstree", function (e, data) {

                     traverseNormativaUnCheck(data.node.id)
                })

            }) 


        }

        function createControlBaseMap()
        {

            $( function() {
                $("input[type='radio']").checkboxradio({
                     icon: false
                }).click(function(){
                    console.log(mapaBaseActual.options.opacity);
                    var opacityS=mapaBaseActual.options.opacity;
                    
                    
                    var radioValue = $("input[id='pnoa_actual']:checked").val();
                    var radioValue2 = $("input[id='pnoa_2015']:checked").val();
                    if($("input[id='pnoa_actual']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        pnoa.addTo(map);
                        mapaBaseActual=pnoa;
                    }
                    if($("input[id='pnoa_2015']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2015.addTo(map);
                        mapaBaseActual=wms2015;
                    }
                    if($("input[id='pnoa_2012']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2012.addTo(map);
                        mapaBaseActual=wms2012;
                    }
                    if($("input[id='pnoa_2010']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2010.addTo(map);
                        mapaBaseActual=wms2010;
                    }
                    if($("input[id='pnoa_2008']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2008.addTo(map);
                        mapaBaseActual=wms2008;
                    }
                    if($("input[id='pnoa_2006']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2006.addTo(map);
                        mapaBaseActual=wms2006;
                    }
                    if($("input[id='pnoa_2002']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2002.addTo(map);
                        mapaBaseActual=wms2002;
                    }
                    if($("input[id='pnoa_2001']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms2001.addTo(map);
                        mapaBaseActual=wms2001;
                    }
                    if($("input[id='pnoa_1995']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms1995.addTo(map);
                        mapaBaseActual=wms1995;
                    }
                    if($("input[id='pnoa_1981_1986']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms81_86.addTo(map);
                        mapaBaseActual=wms81_86;
                    }
                    if($("input[id='pnoa_1956']:checked").val()){
                        map.removeLayer(mapaBaseActual);
                        wms1956.addTo(map);
                        mapaBaseActual=wms1956;
                    }
                    if($("input[id='google_streets']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        googleStreets.addTo(map);
                        mapaBaseActual=googleStreets;       
                    }
                    if($("input[id='google_satellite']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        googleSat.addTo(map);
                        mapaBaseActual=googleSat;       
                    }
                    if($("input[id='google_hibryd']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        googleHybrid.addTo(map);
                        mapaBaseActual=googleHybrid;       
                    }
                    if($("input[id='google_terrain']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        googleTerrain.addTo(map);
                        mapaBaseActual=googleTerrain;       
                    }
                    if($("input[id='google_traffic']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        googleTraffic.addTo(map);
                        mapaBaseActual=googleTraffic;       
                    }
                    if($("input[id='cartdb_light']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        cartodb_light_all.addTo(map);
                        mapaBaseActual=cartodb_light_all;       
                    }
                    if($("input[id='cartdb_dark']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        cartodb_dark_all.addTo(map);
                        mapaBaseActual=cartodb_dark_all;       
                    }
                    if($("input[id='osm1']:checked").val()){     
                        map.removeLayer(mapaBaseActual);
                        osm.addTo(map);
                        mapaBaseActual=osm;       
                    }
    
                    $( "#slider" ).slider( "value" ,opacityS*100);
                    mapaBaseActual.setOpacity(opacityS)
                    
                });
                $( ".controlgroup" ).controlgroup()
                $( ".controlgroup-vertical" ).controlgroup({
                    "direction": "vertical"
                });
            } );

        }

        function createTabBaseMap()
        {

            $( function() {
                $('#tabsBase').tabs({
                    activate: function (event,ui) {
                    //
                    }
                })
            });
        }

        
        function createSliderBaseMap()
        {
            $( function() {
                $( "#slider" ).slider({
                    orientation: "horizontal",
                     range: "min",
                    max: 100,
                    value: 100,
                    slide: refreshM,
                    change: refreshM
                    });
                function refreshM() {
                    var value = $( "#slider" ).slider( "value" )
                    mapaBaseActual.setOpacity(value/100)
    
                }
          
      
            } );
        }

        function createSliderOrdenacion()
        {
            $( function() {
                $( "#sliderOrdenacion" ).slider({
                    orientation: "horizontal",
                    range: "min",
                    max: 100,
                    value: 100,
                    slide: refreshOrdenacion,
                    change: refreshOrdenacion
                });
                function refreshOrdenacion() {
                    var value = $( "#sliderOrdenacion" ).slider( "value" );
                    var nodeid=$("#jstree_ordenacion").jstree('get_selected');
                    var node = $('#jstree_ordenacion').jstree(true).get_node(nodeid);
                    node.data.setOpacity(value/100);
                }
        
            } );
        }

        function createSliderConsultas()
        {

            $( function() {
                $( "#sliderConsultas" ).slider({
                    orientation: "horizontal",
                     range: "min",
                    max: 100,
                    value: 100,
                    slide: refreshConsultas,
                    change: refreshConsultas
                    });
                function refreshConsultas() {
                    var valueS = $( "#sliderConsultas" ).slider( "value" )
                    var node=$("#jstree_consultas").jstree('get_selected')
                    //    console.log($("#jstree_consultas").jstree('get_selected').data('id'));                         
                   // });
                    console.log("node=",node[0]);
                    for(n=0;n<layersMapConsultas.length;n++){
                        var value=layersMapConsultas[n];
                        if(value[0]==node[0]){
                          
    
                            value[1].setStyle({
                                fillOpacity: valueS/100,
                                opacity: valueS/100,
                            });
                            value[1].options.fillOpacity=valueS/100;
                            value[1].options.opacity=valueS/100;
    
    
                        } 
                    }
    
                }
          
      
            } );
        }

        function createSliderNormativa()
        {
            $( function() {
                $( "#sliderNormativa" ).slider({
                    orientation: "horizontal",
                     range: "min",
                    max: 100,
                    value: 100,
                    slide: refreshNormativa,
                    change: refreshNormativa
                    });
                function refreshNormativa() {
                    var valueS = $( "#sliderNormativa" ).slider( "value" )
                    var node=$("#jstree_normativa").jstree('get_selected')
                    //    console.log($("#jstree_consultas").jstree('get_selected').data('id'));                         
                   // });
                    console.log("node=",node[0]);
                    for(n=0;n<layersMapNormativa.length;n++){
                        var value=layersMapNormativa[n];
                        if(value[0]==node[0]){
                          
    
                            value[1].setStyle({
                                fillOpacity: valueS/100,
                                opacity: valueS/100,
                            });
                            value[1].options.fillOpacity=valueS/100;
                            value[1].options.opacity=valueS/100;
    
    
                        } 
                    }
    
                }
          
      
            } );
        }

        function createControlPickerConsultas()
        {

            $( function() {
                $("#colorpicker").spectrum({
                    color: "#f00",
                    change: function(color) {
                        color.toHexString(); // #ff0000
                        console.log("change="+color);
    
                        var valueS = color.toHexString()
                        var node=$("#jstree_consultas").jstree('get_selected')
                   
                        for(n=0;n<layersMapConsultas.length;n++){
                            var value=layersMapConsultas[n];
                            if(value[0]==node[0]){
                          
                                value[1].setStyle({
                                    fillColor: valueS
                                
                                });
                            value[1].options.fillColor=valueS;      
    
                            } 
                        }
                    }
                });
             });
        }

        function createControlPickerNormativa()
        {

            $( function() {
                $("#colorpickerNormativa").spectrum({
                     color: "#f00",
                     change: function(color) {
                         color.toHexString(); // #ff0000
                         console.log("change="+color);
        
                         var valueS = color.toHexString()
                        var node=$("#jstree_normativa").jstree('get_selected')
                        //    console.log($("#jstree_consultas").jstree('get_selected').data('id'));                         
                       // });
                        console.log("node=",node[0]);
                        for(n=0;n<layersMapNormativa.length;n++){
                            var value=layersMapNormativa[n];
                            if(value[0]==node[0]){
                              
                                value[1].setStyle({
                                    fillColor: valueS
                                    
                                });
                                value[1].options.fillColor=valueS;
        
                            } 
                        }
                    }
                });
            });
        
        }

    function createMainTOC_revision()
        {

            
        // accordion Tabla de Contenidos

        $( function() {
            $( "#accordion" ).accordion(
                {active: 1}
            );
        } );

       
        // create Trees Tabla de contenido

        createTreeNormativa();
        createTreeConsultas();
        createTreeOrdenacion();

        // end create Trees Tabla de contenido
                       
         
        // create Control BaseMap

        createControlBaseMap();

        // end create Control BaseMap


       

        var htmSelectPNOA=`<div  class='controlgroup-vertical'>
                           
                            <input type="radio" name="radio-1" id="pnoa_actual" >
                            <label for="pnoa_actual">Mas actual</label>
                            <input type="radio" name="radio-1" id="pnoa_2015" >        
                            <label for="pnoa_2015">2015</label>
                            <input type="radio" name="radio-1" id="pnoa_2012" > 
                            <label for="pnoa_2012">2012</label>
                            <input type="radio" name="radio-1" id="pnoa_2010" > 
                            <label for="pnoa_2010">2010</label>
                            <input type="radio" name="radio-1" id="pnoa_2008" > 
                            <label for="pnoa_2008">2008</label>
                            <input type="radio" name="radio-1" id="pnoa_2006" > 
                            <label for="pnoa_2006">2006</label>
                            <input type="radio" name="radio-1" id="pnoa_2002" > 
                            <label for="pnoa_2002">2002</label>
                            <input type="radio" name="radio-1" id="pnoa_2001" > 
                            <label for="pnoa_2001">2001</label>
                            <input type="radio" name="radio-1" id="pnoa_1995" > 
                            <label for="pnoa_1995">1995</label>
                            <input type="radio" name="radio-1" id="pnoa_1981_1986" > 
                            <label for="pnoa_1981_1986">1981-1986</label>
                            <input type="radio" name="radio-1" id="pnoa_1956" > 
                            <label for="pnoa_1956">1956</label>
                           
                            </div>
                        `;
        var htmSelectGoogle=`<div  class='controlgroup-vertical'>
                           
                            <input type="radio" name="radio-1" id="google_streets" >
                            <label for="google_streets">Google Streets</label>
                            <input type="radio" name="radio-1" id="google_satellite" >        
                            <label for="google_satellite">Google Satellite</label>
                            <input type="radio" name="radio-1" id="google_hibryd" >        
                            <label for="google_hibryd">Google Hybrid</label>
                            <input type="radio" name="radio-1" id="google_terrain" >        
                            <label for="google_terrain">Google Terrain</label>
                            <input type="radio" name="radio-1" id="google_traffic" >        
                            <label for="google_traffic">Google Traffic</label>
                            
                           
                            </div>
                        `;

        var htmSelectCartDB=`<div  class='controlgroup-vertical'>     

                            <input type="radio" name="radio-1" id="cartdb_light" >
                            <label for="cartdb_light">CartoDB (LIGHT)</label>
                            <input type="radio" name="radio-1" id="cartdb_dark" >        
                            <label for="cartdb_dark">CartoDB (DARK)</label>
                            
                            </div>
                        `;

        var htmSelectOSM=`<div  class='controlgroup-vertical'>     

                            <input type="radio" name="radio-1" id="osm1" >
                            <label for="osm1">Open Street Map</label>
                            
                            </div>
                        `;

        var htmlTabsBase=`<div style='padding:0px' id="tabsBase">
                    <ul>
                        <li><a href="#pnoa">PNOA</a></li>
                        <li><a href="#google">GOOGLE</a></li>
                        <li><a href="#cartoDB">CARTODB</a></li>
                        <li><a href="#osm">OSM</a></li>
                    </ul>
        
                    <div id="pnoa">

                        ${htmSelectPNOA}
                         
                    </div>
                    <div  id="google">
                        ${htmSelectGoogle}
                    </div>
                    <div  id="cartoDB">
                        ${htmSelectCartDB}
                    </div>
                    <div  id="osm">
                        ${htmSelectOSM}
                    </div>
                </div>
        
        `;


        // Tab Base Map

        createTabBaseMap();


        // Slider BaseMap

        createSliderBaseMap();
      

        var htmSlider=`<div title="canviar opacitat" id="slider"></div>`;

        // Slider Ordenacion

        createSliderOrdenacion();


        var htmSliderOrdenacion=`<div title="canviar opacitat" id="sliderOrdenacion"></div>`;

         // Slider Consultas

        createSliderConsultas();


        var htmSliderConsultas=`<div title="canviar opacitat" id="sliderConsultas"></div>`;


        // Slider Normativa

        createSliderNormativa();


        var htmSliderNormativa=`<div  title="canviar opacitat" id="sliderNormativa"></div>`;


        var htmTreeNormativa=`<div style='font-size:9pt;overflow:auto;padding:10px;height:320px' id="jstree_normativa"></div>`

        var htmTreeOrdenacion=`<div style='font-size:9pt;overflow:auto;padding:0px;height:386px' id="jstree_ordenacion"></div>`

        var htmTreeConsultas=`<div style='font-size:9pt;overflow:auto;padding:10px;height:320px' id="jstree_consultas"></div>`

        // var htmColorConsultas=`<input data-jscolor="{position:'right'}" value="2CAFFE">`;


        // ControlPicker Consultas

        createControlPickerConsultas();

        var htmColor=`<input  title="canviar color" id='colorpicker' />`


        // ControlPicker Normativa

        createControlPickerNormativa();

        var htmColorNormativa=`<input title="canviar color" id='colorpickerNormativa' />`
       

        var htmlStyleC=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>COLOR</label></td>
                <td>${htmColor}</td>
            
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSliderConsultas}</td>
            
            </tr> 
         
        </TABLE>`;

        var htmlStyleMB=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td style='width:90px'> <LABEL  style='width:120px;padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSlider}</td>
            
            </tr> 
         
        </TABLE>`;
        var htmlStyleO=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td style='width:90px'> <LABEL  style='width:120px;padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSliderOrdenacion}</td>
            
            </tr> 
         
        </TABLE>`;

        var htmlStyleN=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
           
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>COLOR</label></td>
                <td>${htmColorNormativa}</td>
            
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSliderNormativa}</td>
            
            </tr> 
         
        </TABLE>`;


        

        htmAccordion=`<div  id="accordion">
                        <h3>MAPAS BASE</h3>
                            <div style='padding:0px'>
                                ${htmlStyleMB}
                                ${htmlTabsBase} 
                            </div>
                           
                        <h3>PLANS DE ORDENACIÓ / CADASTRE</h3>
                            <div style='overflow: hidden;padding:0px'>
                                ${htmlStyleO}
                                ${htmTreeOrdenacion}
                            </div>
                        <h3>NORMATIVA</h3>    
                            
                            <div style='overflow: hidden;padding:0px'>
                                <input style='font-size:7pt;height:20' class="ui-button ui-widget ui-corner-all" type="button" name="deleteSelectedNormativa" value="Esborrar seleccionats" OnClick="deleteSelectedNormativa()"></input> 
                                <!-- <button style="font-size:8pt;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Esborrar seleccionats" OnClick="deleteSelectedNormativa()', 'text/plain')"><img src="/images/icons_vsgis/delete16.png"> Esborrar </button> -->
                                ${htmlStyleN}
                                ${htmTreeNormativa}
                            </div>
                         
                           
                        <h3>CONSULTAS</h3>
                            <div style='overflow: hidden;padding:0px'>
                                <input style='font-size:7pt;height:20' class="ui-button ui-widget ui-corner-all" type="button" name="deleteSelectedConsultas" value="Esborrar seleccionats" OnClick="deleteSelectedConsultas()" </input> 
                               <!-- <button style="font-size:8pt;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Esborrar seleccionats" OnClick="deleteSelectedConsultas()', 'text/plain')"><img src="/images/icons_vsgis/delete16.png"> Esborrar </button> -->
                                  ${htmlStyleC}
                                
                                 ${htmTreeConsultas}
                            </div>
                    </div>`;

                    // <Label>${htmSliderConsultas}</Label>


         
   
            slide=L.control.slideMenu(htmAccordion,{position: 'topright',menuposition: 'topright',width:'350px',height:'570px'}).addTo(map);
            //slide.toggle();
            
        }
       

        // mainTOVvig

        function createMainTOC_vig()
        {

            
        // accordion Tabla de Contenidos

        $( function() {
            $( "#accordion" ).accordion();
        } );

       
        // create Trees Tabla de contenido

        createTreeNormativa();
        createTreeConsultas();
        createTreeOrdenacion_vig();

        // end create Trees Tabla de contenido
                       
         
        // create Control BaseMap

        createControlBaseMap();

        // end create Control BaseMap


       

        var htmSelectPNOA=`<div  class='controlgroup-vertical'>
                           
                            <input type="radio" name="radio-1" id="pnoa_actual" >
                            <label for="pnoa_actual">Mas actual</label>
                            <input type="radio" name="radio-1" id="pnoa_2015" >        
                            <label for="pnoa_2015">2015</label>
                            <input type="radio" name="radio-1" id="pnoa_2012" > 
                            <label for="pnoa_2012">2012</label>
                            <input type="radio" name="radio-1" id="pnoa_2010" > 
                            <label for="pnoa_2010">2010</label>
                            <input type="radio" name="radio-1" id="pnoa_2008" > 
                            <label for="pnoa_2008">2008</label>
                            <input type="radio" name="radio-1" id="pnoa_2006" > 
                            <label for="pnoa_2006">2006</label>
                            <input type="radio" name="radio-1" id="pnoa_2002" > 
                            <label for="pnoa_2002">2002</label>
                            <input type="radio" name="radio-1" id="pnoa_2001" > 
                            <label for="pnoa_2001">2001</label>
                            <input type="radio" name="radio-1" id="pnoa_1995" > 
                            <label for="pnoa_1995">1995</label>
                            <input type="radio" name="radio-1" id="pnoa_1981_1986" > 
                            <label for="pnoa_1981_1986">1981-1986</label>
                            <input type="radio" name="radio-1" id="pnoa_1956" > 
                            <label for="pnoa_1956">1956</label>
                           
                            </div>
                        `;
        var htmSelectGoogle=`<div  class='controlgroup-vertical'>
                           
                            <input type="radio" name="radio-1" id="google_streets" >
                            <label for="google_streets">Google Streets</label>
                            <input type="radio" name="radio-1" id="google_satellite" >        
                            <label for="google_satellite">Google Satellite</label>
                            <input type="radio" name="radio-1" id="google_hibryd" >        
                            <label for="google_hibryd">Google Hybrid</label>
                            <input type="radio" name="radio-1" id="google_terrain" >        
                            <label for="google_terrain">Google Terrain</label>
                            <input type="radio" name="radio-1" id="google_traffic" >        
                            <label for="google_traffic">Google Traffic</label>
                            
                           
                            </div>
                        `;

        var htmSelectCartDB=`<div  class='controlgroup-vertical'>     

                            <input type="radio" name="radio-1" id="cartdb_light" >
                            <label for="cartdb_light">CartoDB (LIGHT)</label>
                            <input type="radio" name="radio-1" id="cartdb_dark" >        
                            <label for="cartdb_dark">CartoDB (DARK)</label>
                            
                            </div>
                        `;

        var htmSelectOSM=`<div  class='controlgroup-vertical'>     

                            <input type="radio" name="radio-1" id="osm1" >
                            <label for="osm1">Open Street Map</label>
                            
                            </div>
                        `;

        var htmlTabsBase=`<div style='padding:0px' id="tabsBase">
                    <ul>
                        <li><a href="#pnoa">PNOA</a></li>
                        <li><a href="#google">GOOGLE</a></li>
                        <li><a href="#cartoDB">CARTODB</a></li>
                        <li><a href="#osm">OSM</a></li>
                    </ul>
        
                    <div id="pnoa">

                        ${htmSelectPNOA}
                         
                    </div>
                    <div  id="google">
                        ${htmSelectGoogle}
                    </div>
                    <div  id="cartoDB">
                        ${htmSelectCartDB}
                    </div>
                    <div  id="osm">
                        ${htmSelectOSM}
                    </div>
                </div>
        
        `;


        // Tab Base Map

        createTabBaseMap();


        // Slider BaseMap

        createSliderBaseMap();
      

        var htmSlider=`<div title="canviar opacitat" id="slider"></div>`;

        // Slider Ordenacion

        createSliderOrdenacion();


        var htmSliderOrdenacion=`<div title="canviar opacitat" id="sliderOrdenacion"></div>`;

         // Slider Consultas

        createSliderConsultas();


        var htmSliderConsultas=`<div title="canviar opacitat" id="sliderConsultas"></div>`;


        // Slider Normativa

        createSliderNormativa();


        var htmSliderNormativa=`<div  title="canviar opacitat" id="sliderNormativa"></div>`;


        var htmTreeNormativa=`<div style='font-size:9pt;overflow:auto;padding:10px;height:320px' id="jstree_normativa"></div>`

        var htmTreeOrdenacion=`<div style='font-size:9pt;overflow:auto;padding:10px;height:350px' id="jstree_ordenacion"></div>`

        var htmTreeConsultas=`<div style='font-size:9pt;overflow:auto;padding:10px;height:320px' id="jstree_consultas"></div>`

        // var htmColorConsultas=`<input data-jscolor="{position:'right'}" value="2CAFFE">`;


        // ControlPicker Consultas

        createControlPickerConsultas();

        var htmColor=`<input  title="canviar color" id='colorpicker' />`


        // ControlPicker Normativa

        createControlPickerNormativa();

        var htmColorNormativa=`<input title="canviar color" id='colorpickerNormativa' />`
       

        var htmlStyleC=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>COLOR</label></td>
                <td>${htmColor}</td>
            
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSliderConsultas}</td>
            
            </tr> 
         
        </TABLE>`;

        var htmlStyleMB=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td style='width:90px'> <LABEL  style='width:120px;padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSlider}</td>
            
            </tr> 
         
        </TABLE>`;
        var htmlStyleO=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td style='width:90px'> <LABEL  style='width:120px;padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSliderOrdenacion}</td>
            
            </tr> 
         
        </TABLE>`;

        var htmlStyleN=`
        <TABLE style='padding:3px;font-size:9px;font-family:Arial;color:#000000;width:100%;height:10px'  BORDER=0  bgcolor="#cfd7e7" BORDERCOLOR="grey" CELLPADDING=3 CELLSPACING=1>
        
           
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>COLOR</label></td>
                <td>${htmColorNormativa}</td>
            
            </tr> 
            <tr align="left" bgcolor="white" style='padding:0px;font-size:9.5px;font-family:Arial;color:#000000;height:20px'>
                <td> <LABEL  style='padding:3px;font-size:8pt;font-family:Arial;color:#000000;'>OPACITAT</label></td>
                <td>${htmSliderNormativa}</td>
            
            </tr> 
         
        </TABLE>`;


        

        htmAccordion=`<div  id="accordion">
                        <h3>MAPAS BASE</h3>
                            <div style='padding:0px'>
                                ${htmlStyleMB}
                                ${htmlTabsBase} 
                            </div>
                           
                        <h3>PLANS DE ORDENACIÓ / CADASTRE</h3>
                            <div style='overflow: hidden;padding:0px'>
                                ${htmlStyleO}
                                ${htmTreeOrdenacion}
                            </div>
                        <h3>CONSULTAS</h3>
                            <div style='overflow: hidden;padding:0px'>
                                <input style='font-size:7pt;height:20' class="ui-button ui-widget ui-corner-all" type="button" name="addLayersNormativa" value="ESBORRAR SELECCIONATS" OnClick="deleteSelectedConsultas()" </input> 
                                <!-- <button style="font-size:8pt;padding-top:3px;padding-bottom:3px;" class="ui-button ui-widget ui-corner-all" title="Esborrar seleccionats" OnClick="deleteSelectedConsultas_vig()', 'text/plain')"><img src="/images/icons_vsgis/delete16.png"> Esborrar </button> -->
                                  ${htmlStyleC}
                                
                                 ${htmTreeConsultas}
                            </div>
                           
                        
                    </div>`;

                    // <Label>${htmSliderConsultas}</Label>


         
   
        L.control.slideMenu(htmAccordion,{position: 'topright',menuposition: 'topright',width:'350px',height:'537px'}).addTo(map);
        }
        