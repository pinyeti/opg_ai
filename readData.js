

async function readDataFeature(tableSource,filtroSQL){
          
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery");
    const params = {tabla: tableSource, filtro: filtroSQL};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    var response = await fetch(url,dataRequest);
    var info_geojson = await response.json();
    console.log("pasa");

    return info_geojson;    
}    

async function readDataFeatureRPG(tableSource,filtroSQL){
          
    response=null
    if(cross_server){
        let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_fase1_cross");
        const params = {server: protocol_server, tabla: tableSource, filtro: filtroSQL};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        response = await fetch(url,dataRequest);
    }else{
        let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_fase1");
        const params = {tabla: tableSource, filtro: filtroSQL};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        response = await fetch(url,dataRequest);
    }
    var info_geojson = await response.json();
    console.log("pasa");

    return info_geojson;    
} 

async function crossTables(tableSource,tableTarget,filtro){
    //var filtroSQL="refcat='"+boton.value+"'";
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersection2");
   // const params = {tabla: "parcela_su_ru_calles", filtro: filtroSQL};
    //console.log(featureCross);
    const params = {tabla1: tableSource, tabla2: tableTarget,filtroSQL: filtro};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    var response = await fetch(url,dataRequest);
   // console.log(response);
    var info_geojson = await response.json();
   // console.log("res="+info_geojson.features[0].properties.codigo);

    return info_geojson;
   

}

async function crossTablesFilter(tableSource,tableTarget,filtroSource,filtroTarget){
    
    //var filtroSQL="refcat='"+boton.value+"'";
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersectionFilter");
   // const params = {tabla: "parcela_su_ru_calles", filtro: filtroSQL};
    //console.log(featureCross);
    const params = {tablaSOURCE: tableSource, tablaTARGET: tableTarget, filtroSOURCE: filtroSource,filtroTARGET: filtroTarget};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    var response = await fetch(url,dataRequest);
   // console.log(response);
    var info_geojson = await response.json();
   // console.log("res="+info_geojson.features[0].properties.codigo);

    return info_geojson;
   

}

async function crossTablesFilter2(tableSource,tableTarget,filtroSource,filtroTarget){
    
    //var filtroSQL="refcat='"+boton.value+"'";
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersectionFilter2");
   // const params = {tabla: "parcela_su_ru_calles", filtro: filtroSQL};
    //console.log(featureCross);
    const params = {tablaSOURCE: tableSource, tablaTARGET: tableTarget, filtroSOURCE: filtroSource,filtroTARGET: filtroTarget};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    var response = await fetch(url,dataRequest);
   // console.log(response);
    var info_geojson = await response.json();
   // console.log("res="+info_geojson.features[0].properties.codigo);

    return info_geojson;
   

}

async function crossTablesFilterRPG(tableSource,tableTarget,filtroSource,filtroTarget){
    
    //var filtroSQL="refcat='"+boton.value+"'";
    //let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersectionFilter_rpg");
    //const params = {tablaSOURCE: tableSource, tablaTARGET: tableTarget, filtroSOURCE: filtroSource,filtroTARGET: filtroTarget};
    console.log("va a leer crossfilter")

    response=null
    if(cross_server){
        let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersectionFilter_rpg_cross");
        const params = {server:protocol_server,tablaSOURCE: tableSource, tablaTARGET: tableTarget, filtroSOURCE: filtroSource,filtroTARGET: filtroTarget};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        response = await fetch(url,dataRequest);
    }else{
        let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersectionFilter_rpg");
        const params = {tablaSOURCE: tableSource, tablaTARGET: tableTarget, filtroSOURCE: filtroSource,filtroTARGET: filtroTarget};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const dataRequest = {
            method: 'GET'
        };
        response = await fetch(url,dataRequest);

    }
   // console.log(response);
    var info_geojson = await response.json();
   // console.log("res="+info_geojson.features[0].properties.codigo);

    return info_geojson;
   

}

async function readParametersEdif(tableSource,filtroSQL){
    //var filtroSQL="refcat='"+boton.value+"'";
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery");
   // const params = {tabla: "parcela_su_ru_calles", filtro: filtroSQL};
    //console.log(featureCross);
    const params = {tabla: tableSource, filtro: filtroSQL};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const dataRequest = {
        method: 'GET'
    };
    var response = await fetch(url,dataRequest);
   // console.log(response);
    var info_geojson = await response.json();
   // console.log("res="+info_geojson.features[0].properties.codigo);

    return info_geojson;
   

}

