var v = new Valida();
var s =new singlepage();
var windows = ["#main0", "#main1"];
var abas = ["#gerais", "#estoque", "#precos", "#configFiscais","#composicao"];
s.setFrom(windows);
var varGrup; // receber os grupos
var tributacao;//receber todas as tributacao
var optionUrl;
window.tbl_produtos;
function formPadrao()
{
    $("#tab_opcoes li").removeClass("active");
    $("#0").addClass("active");
    controlAbas();
}
function grup(subGrup)
{    
   var tam = varGrup.length;
    for (var i = 0; i < tam; i++) 
    {
       if(varGrup[i].idGrupo == subGrup)
       {
            var tamS = varGrup[i].subgrupos.length;
            for (var x = 0; x < tamS; x++) 
            {
                $("[name=option_subgrupo").append("<option value='"+varGrup[i].subgrupos[x].idSub+"'>"+varGrup[i].subgrupos[x].subgrupo+"</option>");
            }            
       }
    }
}
function editar(tes)
{
    s.mostrar("#main1");
    formPadrao();
    var token = $("#token").val();
    $.post('cadastro-produto/consult/edit/'+tes, {token: token, tipo:1}, function(response)
    {
        console.log(response);
        var obj = JSON.parse(response);
        $("[name=input_ean]").val(obj[0].ean);
        $("[name=input_nameproduto]").val(obj[0].descricao);
        $("[name=input_codigo]").val(obj[0].codig);
        $("[name=input_estoqueminimo]").val(obj[0].qtd_minima);
       $("[name=input_estoquemaximo]").val(obj[0].qtd_maxima);
        //$("input_descricao").val(obj[0].);
        //$("option_fornecedor"").val(obj[0].);
       //$("[name=option_grupo]").val(obj[0].GRUPO);
        //$("[name=option_subgrupo]").val(obj[0].SUBGRUPO);
        $("[name=input_estoque]").val(obj[0].estoque);
        //$("input_nameproduto").val(obj[0].);
        //$("input_descricao").val(obj[0].);
        $("[name=input_vlcusto]").val(obj[0].custo);
        $("[name=input_margemLucro]").val(obj[0].margem_venda);
        $("[name=input_comissao]").val(obj[0].per_comissao);
        $("[name=input_prPadrao]").val(obj[0].valor);
        $("[name=input_prAvista]").val(obj[0].valor1);
       $("[name=input_prPrazo]").val(obj[0].valor2);
       $("[name=input_ncm]").val(obj[0].ncm);
       var tamGrupos = obj['grupos'].length; 
       $("[name=option_grupo]").empty();
       for (var i = 0; i < tamGrupos; i++)
       {
           /* $("[name=option_grupo]").append($('<option>',{
                value: obj['grupos'][i].idGrupo,
                text: obj['grupos'][i].descGrupo
              }));*/
           $("[name=option_subgrupo").empty();
            if(obj[0].idGrupo == obj['grupos'][i].idGrupo)
            {
                $("[name=option_grupo]").append("<option value='"+obj['grupos'][i].idGrupo+"' selected='selected'>"+obj['grupos'][i].descGrupo+"</option>");
                var tamSub = obj['grupos'][i].subgrupos.length;
                for(var x =0;x<tamSub; x++)
                {                
                    if(obj[0].idSubgrupo == obj['grupos'][i].subgrupos[x].idSub)
                    {
                        $("[name=option_subgrupo").append("<option value='"+obj['grupos'][i].subgrupos[x].idSub+"' selected='selected'>"+obj['grupos'][i].subgrupos[x].subgrupo+"</option>");
                    }
                    else{
                        $("[name=option_subgrupo").append("<option value='"+obj['grupos'][i].subgrupos[x].idSub+"'>"+obj['grupos'][i].subgrupos[x].subgrupo+"</option>");
                    }                
                }
            }
            else
            {
                $("[name=option_grupo]").append("<option value='"+obj['grupos'][i].idGrupo+"'>"+obj['grupos'][i].descGrupo+"</option>");
            }                     
       }
       varGrup = obj['grupos'];
    });

    optionUrl = 'cadastro-produto/set/update/'+tes;
}
function excluir(tes, outher)
{
    var  cliente = $(outher).attr('data-v');
    var token = $("#token").val();  
   $.SmartMessageBox(
   {
        title : "Excluir <b>"+cliente+"</b>",
        content : "Deseja Realmente excluir esse Cadastro?",
        buttons : '[Não][Sim]'
    }, function(ButtonPressed) 
    {
        if (ButtonPressed === "Não")
        {        
          console.log('não esxluir');
        }
        if (ButtonPressed === "Sim")
        {
           $.post('cadastro-produto/remove/del/'+tes, {token:token} ,function(response)
           {                           
               alert(response);
           });
                 
        }        
    });
   return false;
}
function controlAbas(aba = "#gerais")
{
    for(var x=0; abas.length>x; x++)
    {
        if(abas[x] != aba)
        {
            $(abas[x]).removeClass("in active");
        }
        else
        {
            $(abas[x]).addClass("in active");
        }
    }
}
function current_page()
{  
   tbl_clientes = $('#tbl_produtos').DataTable(
    {
        "dom": '<"top"f>rt<"bottom"ip><"clear">',
        "autoWidth" : false,
        "language": {
            "sSearch": '<b><span class="fa fa-search"></span>Buscar:</b> ',
            "info":           "&#32; &#32;  Exibindo de _START_ até _END_ entre um total de: _TOTAL_ cadastrados",
            "emptyTable": "Nenhuma informação foi encontrada",
             "loadingRecords": "Carregando...",
             "processing":     "Processando...",
            "paginate": 
            {
                "first":      "Primeiro",
                "last":       "Ultimo",
                "next":       "Próximo",
                "previous":   "Anterior"
            }
        },       
        "order": [[ 2, "asc" ]],
        "aoColumnDefs": [    
        { "aTargets": [0], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Ações","bVisible": true},    
        { "aTargets": [1], "bSearchable": true,"bSortable": true,"sWidth": "40%","sTitle":"Produto","bVisible": true},
        { "aTargets": [2], "bSearchable": true,"bSortable": false,"sWidth": "10%","sTitle":"Codigo","bVisible": true},     
        { "aTargets": [3], "bSearchable": false,"bSortable": true,"sWidth": "15%","sTitle":"EAN","bVisible": true},    
        { "aTargets": [4], "bSearchable": false,"bSortable": true,"sWidth": "7%","sTitle":"Quantidade","bVisible": true}, 
        { "aTargets": [5], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Preço","bVisible": true},        
        ],  
        scrollY: '20v',               
    "scragingType": "full_numbers",
    "createdRow": function ( row, data, index ) {

        console.log(data[5]==15.0000);
            /*if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) 
            {
                console.log('editando...');//$('td', row).eq(5).addClass('highlight');
            }*/
        }
    });  
}
$("#menuAdd_cliente").on("click", function()
{
    formPadrao();
    s.mostrar("#main1");
    optionUrl = 'cadastro-produto/setProdutos';
    var token = $("#token").val(); 
    $.post('cadastro-produto/getGrupo',{token:token}, function(response) 
    {        
        varGrup = [];
        varGrup = JSON.parse(response);
        var tamGrupos = varGrup.length;
        $("[name=option_grupo]").empty();
        
        for (var i = 0; i < tamGrupos; i++)
        {
            $("[name=option_grupo]").append("<option value='"+varGrup[i].idGrupo+"' selected='selected'>"+varGrup[i].descGrupo+"</option>");
        }
        grup(varGrup[0].idGrupo);

        //$("[name=option_grupo]").append("<option value='"+obj['grupos'][i].idGrupo+"' selected='selected'>"+obj['grupos'][i].descGrupo+"</option>");
    });   

});
$("#form_addcliente :input").change(function() 
{   v.getName(this); 
    var tipo = $(this).attr("data-id");   
    if(tipo == "radio"){ return false;} 
    var r = v.result(this.value, tipo);

    if(r == true)
    {
        $("#btn_addcliente").removeAttr('disabled');
    }
    else
    {
        $("#btn_addcliente").attr('disabled','disabled');
    }
});
$(".nav-tabs li").click(function()
{
    $("#tab_opcoes li").removeClass("active");
    $(this).addClass("active");
    var obj = $(this).children();    
    controlAbas(obj[0].hash);
});
$("#btnCancelar_client").on("click", function(){
    s.mostrar("#main0");    
    resetForm('form_addcliente');
});
$("#form_addcliente").submit(function(e)
{     e.preventDefault();
     var serializarDados = $('#form_addcliente').serialize();
     var token = $("#token").val();     
     $.post(optionUrl,serializarDados+"&token="+token, function(response)
     {        
       try
       {
            var obj = JSON.parse(response);
            if(obj.type == 200)
            {
                $("#token").val(obj.token);
                val();
                s.mostrar("#main0");
                $("#form_addcliente input").val("");
                alert(obj.msg);
                optionUrl = "";
            }
            if(obj.type == 'error')
            {
                $("#token").val(obj.token);
                alert(obj.msg);
            }       
       }
        catch(err)
        {
            console.log("error");
            console.log(response);
        }
     });
     
});
function val()
{
    $("#tbl_produtos").DataTable().clear().draw();
    var token = $("#token").val();
    $.post('cadastro-produto/getProdutos', {"all":"all","tipo":1,"token":token}, function(response)
    {
        if(response.length == 0)
        {
            $("tbl_produtos").addClass('hide');
        }
        else
        {
            $("tbl_produtos").removeClass('hide');
        }

        try
        {
            response = JSON.parse(response);
            var tam = response.length;
            for(var x=0; x<tam; x++)
            {
                var edit = " <button class='btn_trEditar' id='"+response[x].COD_PRODUTO+"' onclick='editar(this.id)'><span class='glyphicon glyphicon-edit' ></span></button>";
                var excluir = "    <button class='btn_trExcluir' id='"+response[x].COD_PRODUTO+"' data-v='"+response[x].PRODUTO+"' onclick='excluir(this.id, this)'><span class='glyphicon glyphicon-trash'></span></button>";           
                $('#tbl_produtos').DataTable().row.add([    
                edit+excluir,
                response[x].PRODUTO,   
                response[x].CODIGO,
                response[x].EAN,
                response[x].ESTOQUE,
                response[x].PRECO,
                ]).draw(false);
            }
        }
        catch(err)
        {
            console.log("error");
            console.log(response);
        }
    });
    $("[name=option_grupo]").change(function()
    {   
         $("[name=option_subgrupo]").empty();
        grup($(this).val());

    });
    $("[name=input_impostos]").focus(function()
    {   
        $(this).empty();
        $.post('tributacao/get', {"all":"all","tipo":1,"token":token}, function(response)
        {
            response = JSON.parse(response);
            var tam = response.length;

            for(var x=0; x<tam; x++)
            {
                $("[name=input_impostos]").append('<option value="'+response[x].idTributacao+'">'+response[x].descTributacao+'</option>');
            }

        });
    })
}
current_page();
val();