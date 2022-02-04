function aprobacion_inicial(){
   
        cross_server=false
        protocol_server="https://modeldeciutatgis.palma.cat"
        //protocol_server="http://vscenegis.hopto.org"
        

         //  escribir acceso
        if(cross_server){
            var urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user_cross");
            const paramsA = {server:protocol_server, accion:"acceso_revision"};
            Object.keys(paramsA).forEach(keyA => urlA.searchParams.append(keyA, paramsA[keyA]));
            const dataRequestA = {
                method: 'GET',
            
            }; 
            fetch(urlA,dataRequestA);
        }else{
            var urlA = new URL(window.location.protocol+'//'+window.location.host+"/opg/write_data_user");
            const paramsA = {accion:"acceso_revision"};
            Object.keys(paramsA).forEach(keyA => urlA.searchParams.append(keyA, paramsA[keyA]));
            const dataRequestA = {
                method: 'GET',
            
            }; 
            fetch(urlA,dataRequestA);

        }

        var popup = L.popup();

        puntos=null

        var titlePanels="";
        var contenidoPanel=`<div style='background-color:#f2f2f2;border-style: solid;border-width:0.1pt;border-color:black;' class="contenidoPanel">piaxxxxx</div>`;
        
      //  console.log(myData);
        // Create variable to hold map element, give initial settings to map
        // var map = L.map('map',{ center: [39.5695100, 2.6474500], zoom: 11, maxZoom: 18});
        map = L.map('map',{center: [39.5795100, 2.6874500], zoom: 12, minZoom: 12,maxZoom: 20})

        var measureControl = L.control.measure({
         
            position: 'topleft',
            primaryLengthUnit: 'meters',
            secondaryLengthUnit: 'kilometers',
            primaryAreaUnit: 'sqmeters',
            activeColor: '#990000',
            completedColor: '#001a80',
            units:
            {
            meters: {
               // factor: 0.001, // Required. Factor to apply when converting to this unit. Length in meters or area in sq meters will be multiplied by this factor.
                display: 'metres', // Required. How to display in results, like.. "300 Meters (0.3 My New Unit)".
                decimals: 2 // Number of decimals to round results when using this unit. `0` is the default value if not specified.
            },
            sqmeters: {
               // factor: 0.001, // Required. Factor to apply when converting to this unit. Length in meters or area in sq meters will be multiplied by this factor.
                display: 'm2', // Required. How to display in results, like.. "300 Meters (0.3 My New Unit)".
                decimals: 2 // Number of decimals to round results when using this unit. `0` is the default value if not specified.
            },
            
            }   
           
          
        }); 
        measureControl.addTo(map); 

       // L.control.scale().addTo(map);
      // L.control.scalefactor().addTo(map);
        
        //$('.leaflet-control-attribution').hide();
        //document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';
       

        

        var help=true;
        var defaultCursor=document.getElementById('map').style.cursor;
        document.getElementById('map').style.cursor = 'help';
        var icon1='fa fa-info-circle  fa-2x'
        var icon2='fa fa-minus-circle fa-2x'
        
        var actionInfo = L.Toolbar2.Action.extend({
            options: {
                toolbarIcon: {
                    className: icon2,
                    tooltip:'Deseleccionar els elements',
                }
            },
            addHooks: function () {
                console.log("pulsado")
                if(puntos!=null) map.removeLayer(puntos);  
             
               
            }

        });
        var actionDefault = L.Toolbar2.Action.extend({
            options: {
                toolbarIcon: {
                    className: icon2
                }
            },
            addHooks: function () {
                if(help==true){             
                    document.getElementById('map').style.cursor = defaultCursor;
                    help=false;             
                }             
            }
        });

        new L.Toolbar2.Control({
          
            position: 'topleft',
            actions: [actionInfo]
        }).addTo(map); 


        geomCruce="";
        catalogosCadena="";
        parcelasCadena="";
        callesCadena="";
        hojas1000Cadena="";
        hojas1000UTMCadena="";
        zonasCadena="";
        clasSueloCadena="";
        htmlarray=new Array(); 
        arrayArticulos = []; 
        arrayArticulosD = []; 
       // var arrayNormativa = new Array(); 
        contDiv=0;


        

        function changeColor(newColor) {
            var elem = document.getElementById('div1');
            var idhtml = document.getElementById("cambiar");
            var indexHTML = idhtml.selectedIndex;
            console.log("indice="+indexHTML);
            console.log("array="+htmlarray);
            elem.style.color = newColor;
            elem.innerHTML=htmlarray[indexHTML];
           
        }

        

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
        

       

      

       

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }
        
        function currentSlide(n) {
            showSlides(slideIndex = n);
        }
        
        function showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            var dots = document.getElementsByClassName("demo");
            var captionText = document.getElementById("caption");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
            captionText.innerHTML = dots[slideIndex-1].alt;
        }

       /* async function readDataFeature(tableSource,filtroSQL){
          
            let url = new URL("http://"+serverPath+"/infoquery");
            const params = {tabla: tableSource, filtro: filtroSQL};
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const dataRequest = {
                method: 'GET'
            };
            var response = await fetch(url,dataRequest);
            var info_geojson = await response.json();

            return info_geojson;        

        } */

        

      
        
       
        
        

       

        

       

        function doImage(err, canvas) {
           
            var img = document.createElement('img');
            var dimensions = map.getSize();
            img.width = dimensions.x;
            img.height = dimensions.y;
            img.src = canvas.toDataURL();
            document.getElementById('imagemap').innerHTML = '';
            document.getElementById('imagemap').appendChild(img);
        }

       

        var content="paix"
        map.on('click', function(e) {

          if(help==true){  
            var popLocation= e.latlng;
            var x=e.latlng.utm().x
            var y=e.latlng.utm().y

            infoFeaturesFASE1(e);

           
          
              
          }  
        });
        // Add OpenStreetMap tile layer to map element
       osm=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {   
            maxZoom: 21,
            maxNativeZoom: 19,
        	attribution: '© OpenStreetMap'
        })
        cartodb_light_all=L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {   
            minZoom:10, 
            maxZoom: 20,
          //  maxNativeZoom: 19,
        	// attribution: '© OpenStreetMap',
            edgeBufferTiles: 1
            
        }) 
        cartodb_dark_all=L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {    
            maxZoom: 21, 
            maxNativeZoom: 19,
        	// attribution: '© OpenStreetMap'
        }) 

       /* var catastro=L.tileLayer.wms('https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?', {   
        //var catastro=L.tileLayer.wms('http://ovc.catastro.meh.es/cartografia/INSPIRE/spadgcwms.aspx', {     
            layers: "Catastro",//nombre de la capa (ver get capabilities)
            format: 'image/jpeg',
            transparent: true,
            //version: '1.1.1',//wms version (ver get capabilities)
            attribution: "DIRECCION GENERAL DEL CATASTRO",
            tms:true,
             maxZoom: 20,
             edgeBufferTiles: 1
        }) */
        
        pnoa = L.tileLayer.wms("http://www.ign.es/wms-inspire/pnoa-ma?SERVICE=WMS&", {
            layers: "OI.OrthoimageCoverage",//nombre de la capa (ver get capabilities)
            format: 'image/jpeg',
            transparent: true,
            version: '1.3.0',//wms version (ver get capabilities)
            //attribution: "PNOA WMS. Cedido por © Instituto Geográfico Nacional de España",
            maxZoom: 19,
            edgeBufferTiles: 0
        });

        //  var osm=L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {  
       // var layerToner = new L.StamenTileLayer("terrain").addTo(map); // wstercolor,terrain,toner

      

       /* var wmsPARCELAS = L.tileLayer.wms("http://vscenegis.hopto.org:5000/geoserver/pgou98/wms?", {
                      
            layers:'parcela_su_ru_calles',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
            // attribution: 'OFICINA PLAN GENERAL & SERVICIO INFORMACIÓN URBANISTICA',
            minZoom: 18,
            maxZoom: 20,
            //edgeBufferTiles: 1
           
        }) */

       /* var wmsCONSTRU_SU = L.tileLayer.wms("http://vscenegis.hopto.org:5000/geoserver/pgou98/wms?", {
                      
            layers:'constru_su2',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 18,
            maxZoom: 20,
            //edgeBufferTiles: 1
           
        }) */

        /* var wms_calific_zonas = L.tileLayer.wms("http://vscenegis.hopto.org:5000/geoserver/OPG_VIGENTE/wms?", {
                      
            layers:'calific_zonas',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        }).addTo(map);  */

       // https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_1956_IB/MapServer/WMSServer?request=GetCapabilities&service=WMS
       // https://ideib.caib.es/geoserveis/rest/services/imatges/GOIB_Ortofoto_1984_IB/MapServer?request=GetCapabilities&service=WMS
       // https://ideib.caib.es/geoserveis/services/imatges/GOIB_Foto_2001_IB/MapServer/WMSServer?request=GetCapabilities&service=WMS
       // https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2002_IB/MapServer/WMSServer?request=GetCapabilities&service=WMS
       // https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2018_IB/MapServer/WMSServer?request=getCapabilities&service=wms

       wms1956 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_1956_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })
       // map.addLayer(wms1956);

        wms1995 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Foto_1995_Ma/MapServer/WMSServer?", {
                      
            layers:'1',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })
      //  map.addLayer(wms1995);

        wms2001 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Foto_2001_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })
       // map.addLayer(wms2001);

       wms2002 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2002_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wms2006 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2006_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wms2008 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2008_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wms2010 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2010_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wms2012 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2012_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })
        
        wms2015 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2015_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wms2018 = L.tileLayer.wms("https://ideib.caib.es/geoserveis/services/imatges/GOIB_Ortofoto_2018_IB/MapServer/WMSServer?", {
                      
            layers:'0',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wms81_86 = L.tileLayer.wms("http://www.ign.es/wms/pnoa-historico", {
                      
            layers:'Nacional_1981-1986',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        // http://www.ign.es/wms/pnoa-historico


        wmsPNOA2018 = L.tileLayer.wms("http://www.ign.es/wms-inspire/pnoa-ma?SERVICE=WMS&", {
                      
            layers:'OI.OrthoimageCoverage',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        wmsPNOA2015 = L.tileLayer.wms("http://www.ign.es/wms/pnoa-historico", {
                      
            layers:'PNOA2015',
            format: 'image/png',
            // crs: crs25831,
            transparent: true,
            continuousWorld: true,
           // attribution: 'Toni & Feliu',
            minZoom: 12,
            maxZoom: 20,
            edgeBufferTiles: 1
           
        })

        googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
            minZoom: 12,
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });

        googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
            minZoom: 12,
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });

        googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
            minZoom: 12,
            maxZoom: 20,
            
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        });

        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            minZoom: 12,
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
            //edgeBufferTiles: 1
        });

        googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
            minZoom: 12,
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });

        var mapLink = '<a href="http://www.esri.com/">Esri</a>';
        var wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        
        esriMap=L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; '+mapLink+', '+wholink,
            minZoom: 12,
            maxZoom: 18,
        });

    

        map.addLayer(cartodb_light_all);

      //  map.addLayer(wmsPNOA2018);

       // map.addLayer(wmsPARCELAS);
       // map.addLayer(wmsCONSTRU_SU);
       
        
        map.on('zoomend', function () {
          
        }); 

       


        


        baseTree = [
            {
                label: "<LABEL style='font-size:8pt;font-family:Arial Black;color:black'><U>INFORMACIÓ BASE</U></LABEL>",
                children: [
                    
                    {label: "CartoDB (light_all)", layer: cartodb_light_all, name: 'CartoDB (light_all)'},
                    {label: "CartoDB (dark_all)", layer: cartodb_dark_all, name: 'CartoDB (dark_all)'},
                    {label: '<i class="fa fa-bars fa-xs"></i> OSM', layer: osm, name: 'OpenStreeMap'},
                    {label: 'PNOA Actual', layer: wmsPNOA2018, name: 'PNOA 2018'},
                   // {label: '2018', layer: wms2018, name: 'PNOA 2018'},
                    {label: '2015', layer: wms2015, name: 'PNOA 2015'},
                    {label: '2012', layer: wms2012, name: 'PNOA 2012'},
                    {label: '2010', layer: wms2010, name: 'PNOA 2010'},
                    {label: '2008', layer: wms2008, name: 'PNOA 2008'},
                    {label: '2006', layer: wms2006, name: 'PNOA 2006'},
                    {label: '2002', layer: wms2002, name: 'PNOA 2018'},
                    {label: '2001', layer: wms2001, name: 'PNOA 2018'},
                    {label: '1995', layer: wms1995, name: 'PNOA 2018'},
                    {label: '1981-1986', layer: wms81_86, name: 'PNOA 2018'},
                    {label: '1956', layer: wms1956, name: 'PNOA 2018'},
                    {label: 'googleStreets', layer: googleStreets, name: 'PNOA 2018'},
                    {label: 'googleHybrid', layer: googleHybrid, name: 'PNOA 2018'},
                    {label: 'googleTraffic', layer: googleTraffic, name: 'PNOA 2018'},
                    {label: 'googleSat', layer: googleSat, name: 'PNOA 2018'},
                    {label: 'googleTerrain', layer: googleTerrain, name: 'PNOA 2018'},
                   // {label: 'esriMap', layer: esriMap, name: 'PNOA 2018'},
                    
                    
                   
                ]
            }
        ];     
        
        //var catastro=L.tileLayer('http://'+serverPath+'/images/CONSTRU2/{z}/{x}/{y}.png', {
        catastro=L.tileLayer(protocol_server+'/images/CATASTRO2020/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            opacity:1,
            // attribution: 'Generated by TilesXYZ',
            edgeBufferTiles: 1
        });  

        cartografia_imi=L.tileLayer(protocol_server+'/images/CARTOGRAFIA/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            opacity:1,
            //attribution: 'Cartografia elaborada por IMI Palma',
            edgeBufferTiles: 1
        }).addTo(map);  
       

        clasificacion_suelo=L.tileLayer(protocol_server+'/images/CLASIFICACION_SUELO_AI/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '<a href="https://www.palma.cat/portal/PALMA/contenedor1.jsp?seccion=s_lloc_d10_v1.jsp&codbusqueda=221&language=ca&codResi=1&codMenuPN=1812&codMenu=845&layout=contenedor1.jsp&layout=contenedor1.jsp">(OPG) Oficina Plan General</a>', 
            edgeBufferTiles: 1
        })     


        categorias_rustico=L.tileLayer(protocol_server+'/images/CATEGORIAS_RUSTICO_AI/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '<a href="https://www.palma.cat/portal/PALMA/contenedor1.jsp?seccion=s_lloc_d10_v1.jsp&codbusqueda=221&language=ca&codResi=1&codMenuPN=1812&codMenu=845&layout=contenedor1.jsp&layout=contenedor1.jsp">(OPG) Oficina Plan General</a>', 
            edgeBufferTiles: 1
        }).addTo(map); ;  


        apt_rev=L.tileLayer(protocol_server+'/images/APT_REV/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '(OPG) Oficna Plan general)', 
            edgeBufferTiles: 1
        })  

        apt_otras=L.tileLayer(protocol_server+'/images/APT_REV_OTRAS/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '(OPG) Oficna Plan general)', 
            edgeBufferTiles: 1
        })  

        apr_rev=L.tileLayer(protocol_server+'/images/APR_REV/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '<a href="https://www.palma.cat/portal/PALMA/contenedor1.jsp?seccion=s_lloc_d10_v1.jsp&codbusqueda=221&language=ca&codResi=1&codMenuPN=1812&codMenu=845&layout=contenedor1.jsp&layout=contenedor1.jsp">(OPG) Oficina Plan General</a>', 
            edgeBufferTiles: 1
        })

        calificaciones=L.tileLayer(protocol_server+'/images/CALIFICACIONES_AI/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '<a href="https://www.palma.cat/portal/PALMA/contenedor1.jsp?seccion=s_lloc_d10_v1.jsp&codbusqueda=221&language=ca&codResi=1&codMenuPN=1812&codMenu=845&layout=contenedor1.jsp&layout=contenedor1.jsp">(OPG) Oficina Plan General</a>', 
            edgeBufferTiles: 1
        }).addTo(map);   

        ambitos_ai=L.tileLayer(protocol_server+'/images/AMBITOS_AI/{z}/{x}/{y}.png', {
            minZoom: 12,
            maxZoom: 20,
            tms: false,
            
            attribution: '<a href="https://www.palma.cat/portal/PALMA/contenedor1.jsp?seccion=s_lloc_d10_v1.jsp&codbusqueda=221&language=ca&codResi=1&codMenuPN=1812&codMenu=845&layout=contenedor1.jsp&layout=contenedor1.jsp">(OPG) Oficina Plan General</a>', 
            edgeBufferTiles: 1
        }).addTo(map);   



        overlayTree = [
            {
                label: "<LABEL style='font-size:8pt;font-family:Arial Black;color:black'><U>PLANEAMIENTO</U></LABEL>",
                children: [
                  

                    {label: "Catastro", layer: catastro, name: 'PLan General'},
                    {label: "Cartografia", layer: cartografia_imi, name: 'PLan General'},               
                    {label: "Categories Rùstic", layer:categorias_rustico, name: 'Categories Rùstic'},                
                    
                    {label: "Clasificacio sol", layer: clasificacion_suelo, name: 'PLan General'},
                    {label: "Plan general", layer: calificaciones, name: 'PLan General'},
                    {label: "Ambitos", layer: ambitos_ai, name: 'PLan General'},
                    {label: "APT (Revisió)", layer: apt_rev, name: 'PLan General'},   
                    {label: "APT (Reservas)", layer: apt_otras, name: 'PLan General'},   
                    {label: "APR (Revisió)", layer: apr_rev, name: 'PLan General'},
                   
                ]
            }
        ];     

        //  L.control.layers.tree(baseTree,overlayTree).addTo(map);

           L.control.layers.tree(baseTree,overlayTree);



     

         map.addControl(new L.Control.Fullscreen());
        

        /* var geocoder = L.Control.geocoder({
             defaultMarkGeocode: false
        }) .on('markgeocode', function(e) {
            var bbox = e.geocode.bbox;
            var poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest()
              //  ]).addTo(map);
                ])
                map.fitBounds(poly.getBounds());
            }).addTo(map); */

        sidebar = L.control.sidebar({
            autopan: true,       // whether to maintain the centered map point when opening the sidebar
            closeButton: true,    // whether t add a close button to the panes
            container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
            position: 'left',     // left or right
            
        }).addTo(map);
       
        

        /* add a new panel */
        panelContent = {
            id: 'userinfo',                     // UID, used to access the panel
            tab: '<i class="fa fa-info"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
            title:'Informació de dades',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

        /* add a new panel */
        panelQuery = {
            id: 'queryTables',                     // UID, used to access the panel
            tab: '<i class="fa fa-table"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
            title:'Consulta entitats urbanístiques',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

        /* add a new panel */
        panelQueryExped = {
            id: 'queryExp',                     // UID, used to access the panel
            tab: '<i class="fa fa-file"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
            title:'Consulta expedients',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

        /* add a new panel */
        panelLegend = {
            id: 'legendMap',                     // UID, used to access the panel
            tab: '<i class="fa fa-map"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
            //title:'paixxxxx',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

         /* add a new panel */
        panelSearch = {
            id: 'searchDir',                     // UID, used to access the panel
            tab: '<i class="fa fa-search"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
            title:'Cercar per direcció/ref.cadastral',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

         /* add a new panel */
        panelCompute = {
            id: 'compute',                     // UID, used to access the panel
           //  tab: '<i class="fa fa-calculator"></i>',  // content can be passed as HTML string,
            tab: '<i class="fa fa-font"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
            title:'Consulta normatives',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

         /* add a new panel */
        panelSpatial = {
            id: 'spatial',                     // UID, used to access the panel
            tab: '<i class="fa fa-object-group"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
           // title:'paixxxxx',              // an optional pane header
           // position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

         /* add a new panel */
        panelConfig = {
            id: 'configProperties',                     // UID, used to access the panel
            tab: '<i class="fa fa-gear"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
           // title:'paixxxxx',              // an optional pane header
            position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

          /* add a new panel */
        panelUser = {
            id: 'configUser',                     // UID, used to access the panel
           // tab: '<i class="fa fa-user"></i>',  // content can be passed as HTML string,
           tab: '<i class="fa fa-question-circle fa-2x"></i>', 
            pane: '-',        // DOM elements can be passed, too
           // title:'paixxxxx',              // an optional pane header
            position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };

          /* add a new panel */
        panelStatistic = {
            id: 'statistic',                     // UID, used to access the panel
            tab: '<i class="fa fa-user"></i>',  // content can be passed as HTML string,
            pane: '-',        // DOM elements can be passed, too
           // title:'paixxxxx',              // an optional pane header
            position: 'bottom'                  // optional vertical alignment, defaults to 'top'
          
        };



        sidebar.addPanel(panelContent);
        sidebar.addPanel(panelQuery);
       // sidebar.addPanel(panelQueryExped);
         sidebar.addPanel(panelSearch);
     //   sidebar.addPanel(panelLegend);
        sidebar.addPanel(panelCompute);
      /*  sidebar.addPanel(panelSpatial);
        sidebar.addPanel(panelSearch);
        sidebar.addPanel(panelUser);
        sidebar.addPanel(panelConfig); */ 

      //  sidebar.addPanel(panelStatistic);

        sidebar.addPanel(panelUser);


       
        accL = document.getElementsByClassName("accordionLegend");
        
        var i;
    
        for (i = 0; i < accL.length; i++) {
          
            
            accL[i].addEventListener("click", function() {
                this.classList.toggle("activeLegend");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                    
                } else {
                    panel.style.display = "block";
                    
                }
            });
        }

        // en leyenda     


        layerUser=null;

       

        // create Query Vigente
        strSelectTABLE=null;
        divOptionsQUERY=null;
        divQUERY=null;
        contentQuery(); 
        // end create Query Revision

         // create Query Revision
        htmContentQueryRPG=null;
        strSelectTABLE_RPG=null;
        divOptionsQUERY_RPG=null;
        divQUERY_RPG=null;
        contentQueryRPG();
        // end create Query Revision

        // contentQueryEXP();
        contentSEARCH(); 

        sidebarStatus="cerrado";  

            sidebar.on('opening', function(e) {
                // e.id contains the id of the opened panel

                console.log("abriendo");
                sidebarStatus="abierto";

            })

             sidebar.on('closing', function(e) {
                // e.id contains the id of the opened panel

                console.log("cerrando");
                 sidebarStatus="cerrado";

            })

          

         graphicScale = L.control.graphicScale({fill:'hollow',doubleLine:false}).addTo(map);
         L.control.mouseCoordinate({utm:true,gps:false,gpsLong:false}).addTo(map); 

        // if(isMobile())
        //   map.toggleFullscreen();

      


        appearanceControl=null;

        async function createOverlay(){

            var basetree={

                "CartoDB (light_all)": cartodb_light_all,
                "CartoDB (dark_all)":  cartodb_dark_all,
                "OpenStreeMap":osm,

            }
            
            var overlay = {
           
                "PNOA 2019": wmsPNOA2018,
               // "Parcela Catastral": wmsPARCELAS,
               // "Construcciones": wmsCONSTRU_SU,
                "catastro": catastro,
                "Plan Vigente": planeamiento,
                "Revisión PG": revision_fase1
           
            }   


           appearanceControl = L.control.appearance(null,overlay,null, {
                                                    opacity:true,
                                                    remove:true,
                                                    color:true,
                                                    removeIcon:'/stylesheets/images/delete16.png'});
          
             appearanceControl.addTo(map); 
         
           // appearanceControl._createColorElement("PRUEBA2","#ffff4d");
             appearanceControl.collapse();
            // appearanceControl.expand();

              appearanceControl._update();
          
         } 

        // createOverlay();

        stateViewAC=false;


        btnMapPDF=L.easyButton('<i class="fa fa-map" style="color:#6680e6;" ></i>', function(btn, map){
            
            findHoja(map)
            if(map.getZoom()>=16)
                console.log("activar")
        },'Obrir planol POD (que conté el punt central del mapa)') 


        async function findHoja(map){



            console.log('Zoom: ' +map.getZoom())
            console.log('Zoom: ' +map.getCenter())
            var x=map.getCenter().utm().x
            var y=map.getCenter().utm().y
            console.log(x+","+y);

            // ver si esta en centro historico o fuera

            response1=null
            if(cross_server){
                let url1 = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoXY_FASE1_cross");
                const params1 = {server: protocol_server, tabla: "centro_historico", x: x, y: y};
                Object.keys(params1).forEach(key1 => url1.searchParams.append(key1, params1[key1]));
                const dataRequest1 = {
                    method: 'GET',
                
                };
                response1 = await fetch(url1,dataRequest1);
            }else{
                let url1 = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoXY_FASE1");
                const params1 = {tabla: "centro_historico", x: x, y: y};
                Object.keys(params1).forEach(key1 => url1.searchParams.append(key1, params1[key1]));
                const dataRequest1 = {
                    method: 'GET',
                
                };
                response1 = await fetch(url1,dataRequest1);
            }
            // console.log(response);
            var geojsonRES1 = await response1.json();

            tabla="hojas1000"
            console.log(geojsonRES1.features)
            if(geojsonRES1.features!=null)
                tabla="hojas500ch" 

            // encontrar hoja
            response=null
            if(cross_server){
                let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoXY_FASE1_cross");
                const params = {server: protocol_server, tabla: tabla, x: x, y: y};
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                const dataRequest = {
                    method: 'GET',
                
                };
                response = await fetch(url,dataRequest);
            }else{
                let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoXY_FASE1");
                const params = {tabla: tabla, x: x, y: y};
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                const dataRequest = {
                    method: 'GET',
                
                };
                response = await fetch(url,dataRequest);

            }
            
            // console.log(response);
            var geojsonRES = await response.json();
            console.log(geojsonRES.features[0].properties.hojasCordenadas)
            if(tabla=="hojas500ch") 
                window.open(protocol_server+'/images/_INDEX_OPG21/CH'+geojsonRES.features[0].properties.hoja+".pdf", '_blank');
            else 
                window.open(protocol_server+'/images/_INDEX_OPG21/'+geojsonRES.features[0].properties.hojasCordenadas+".pdf", '_blank');
            
      
        }

        async function testInPage(){

            var x=map.getCenter().utm().x
            var y=map.getCenter().utm().y
            console.log(x+","+y);

            // ver si esta en centro historico o fuera

            response1=null
            if(cross_server){
                let url1 = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoXY_FASE1_cross");
                const params1 = {server: protocol_server, tabla: "hojas1000", x: x, y: y};
                Object.keys(params1).forEach(key1 => url1.searchParams.append(key1, params1[key1]));
                const dataRequest1 = {
                    method: 'GET',
                };
                response1 = await fetch(url1,dataRequest1);
            }else{
                let url1 = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoXY_FASE1");
                const params1 = {tabla: "hojas1000", x: x, y: y};
                Object.keys(params1).forEach(key1 => url1.searchParams.append(key1, params1[key1]));
                const dataRequest1 = {
                    method: 'GET',
                };
                response1 = await fetch(url1,dataRequest1);

            }
            
            var geojsonRES1 = await response1.json();
           

            if(geojsonRES1.features[0].properties.atlasSiNo=="SI" && map.getZoom()>=17)
                map.addControl(btnMapPDF);
            else 
                map.removeControl(btnMapPDF);

        }

        map.on('zoomend', function () {
           testInPage()    
          
        }); 

        map.on('dragend', function () {
            
             testInPage()
            console.log("termina drag")
          
        }); 


      

        if(!isMobile())
            L.control.browserPrint().addTo(map)

      
        // nuevo TOC Control de capas



        // inicilaizar mapaBase

        mapaBaseActual=cartodb_light_all;
        
        ordenacion=new Array(4);
      

        layersMapConsultas=new Array();
        layersMapNormativa=new Array(); // para consultas fijas  

        //-----
        initMapRev=false;
        layersMapRev=new Array(); // layers temporales normativa

         arrayNormativaRev=new Array();

        mapNormativa=null; 
        getJSONDataRPG(); // create modulo normativa

        slide=null;
        createMainTOC_revision() // create Tabla contenidos

        createQueryDialog() // create query Dialog

        if(!isMobile())
            $( function() {
                $( document ).tooltip({
                //show: { effect: "blind", duration: 400 }
                //show: { effect: "explode", duration: 400 }
                //hide: { effect: "explode", duration: 1000 }
                show: { effect: 'slideDown', delay: 200, duration: 250 }
            
                });
            } );

       

         window.setTimeout(function() {
             if(!isMobile())
                slide._animate(slide._menu, 0, 0, true, 0, 0);
           
        }, 200);

        infoVisor()

        


}

       


    
        
       
      
   

     
     

