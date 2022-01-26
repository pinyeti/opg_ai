

async function readDataFeature(tableSource,filtroSQL){
          
    let url = new URL(window.location.protocol+'//'+window.location.host+"/infoquery");
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
          
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/infoquery_rpg");
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

async function crossTables(tableSource,tableTarget,filtro){
    //var filtroSQL="refcat='"+boton.value+"'";
    let url = new URL(window.location.protocol+'//'+window.location.host+"/intersection2");
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
    let url = new URL(window.location.protocol+'//'+window.location.host+"/intersectionFilter");
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
    let url = new URL(window.location.protocol+'//'+window.location.host+"/opg/intersectionFilter_rpg");
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
    let url = new URL(window.location.protocol+'//'+window.location.host+"/intersectionFilter2");
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

async function readParametersEdif(tableSource,filtroSQL){
    //var filtroSQL="refcat='"+boton.value+"'";
    let url = new URL(window.location.protocol+'//'+window.location.host+"/infoquery");
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

