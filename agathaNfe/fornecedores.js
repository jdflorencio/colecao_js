var v = new Valida();
var s =new singlepage();
var windows = ["#main0", "#main1"];
var abas = ["#gerais", "#telefones", "#enderecos", "#email"];
var optionForm;
var optionUrl;
//var local = 'http://127.0.0.1/project_nfe/';

s.setFrom(windows);
window.tbl_clientes;

function editar(tes)
{
    s.mostrar("#main1");   
    optionUrl = 'fornecedores/set/update/'+tes;  
    var token = $("#token").val();
   $.post('fornecedores/consult/edit/'+tes, {token:token}, function(response)
    {        
        $("#tab_opcoes li").removeClass("active");
        $("#0").addClass("active");
        controlAbas();
        var obj = JSON.parse(response);  
        var radio = '';
        console.log(obj[0].tipo_pessoa, obj[0].email1);

       if(obj[0].tipo_pessoa =='0' || obj[0].tipo_pessoa ==0)
       {
           radio = 'pessoa_0';
           $('#' + radio).prop('checked',true);
           optionPessoa(0);
       }
       else
       {       
            radio='pessoa_1';
             $('#' + radio).prop('checked',true);
             optionPessoa(1);
       }
        $("#input_name").val(obj[0].nome);
        $("#input_apelido").val(obj[0].apelido);
        $("#input_dataNascimento").val(obj[0].dt_nascimento);
        $("#input_cpf").val(obj[0].cpf);
        $("#input_cnpj").val(obj[0].cnpj);
        $("#input_ies").val(obj[0].ies);
        $("#input_matricula").val(obj[0].matricula);
        $("#input_cell1").val(obj[0].cell1);
        $("#input_cell2").val(obj[0].cell2);
        $("#input_tel1").val(obj[0].tel1);
        $("#input_tel2").val(obj[0].tel2);
        $("#input_endereco").val(obj[0].endereco);
        $("#input_bairro").val(obj[0].bairro);
        $("#input_cidade").val(obj[0].cidade);
        $("#input_uf").val(obj[0].uf);
        $("#input_cep").val(obj[0].cep);
        $("#input_email1").val(obj[0].email1);
        $("#input_email2").val(obj[0].email2);
    });
   
   $("#btn_addcliente").removeAttr('disabled');
    optionUrl = 'fornecedores/set/update/'+tes;
    return optionUrl;
}
function excluir(tes, outher)
{
    var  cliente = $(outher).attr('data-v');
    var token = $("#token").val();  
   $.SmartMessageBox({
                    title : "Excluir <b>"+cliente+"</b>",
                    content : "Deseja Realmente excluir esse Cadastro?",
                    buttons : '[Não][Sim]'
                }, function(ButtonPressed) 
                {
                    if (ButtonPressed === "Não")
                    {        
                      
                    }
                    if (ButtonPressed === "Sim")
                    {
                       $.post('fornecedores/remove/del/'+tes, {token:token} ,function(response)
                       {                           
                            val();
                       });
                       
                    }        
                });
               return false;
}
function optionPessoa(option) 
{
    if(option !=0)
        {
             $("#div_nascimento").addClass("hide");
             $("#div_cpf").addClass("hide"); 
             $("#name").addClass("hide"); 
             $("#apelido").addClass("hide");
             $("#sexo").addClass("hide");  
             $("#div_ies").removeClass("hide");
             $("#div_cnpj").removeClass("hide"); 
             $("#razao").removeClass("hide");  
             $("#fantasia").removeClass("hide");
        }
        else
        {
            $("#div_nascimento").removeClass("hide");
            $("#div_cpf").removeClass("hide"); 
            $("#name").removeClass("hide"); 
            $("#apelido").removeClass("hide");
            $("#sexo").removeClass("hide");
            $("#div_ies").addClass("hide");  
            $("#div_cnpj").addClass("hide"); 
            $("#razao").addClass("hide");  
            $("#fantasia").addClass("hide");
        }  
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
   tbl_clientes = $('#tbl_clientes').DataTable(
    {
        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-12'f>",
        "autoWidth" : false,
        "oLanguage": {
            "sSearch": ''
        },
        "order": [[ 2, "asc" ]],
        "aoColumnDefs": [    
        { "aTargets": [0], "bSearchable": false,"bSortable": true,"sWidth": "10%","sTitle":"Ações","bVisible": true},    
        { "aTargets": [1], "bSearchable": true,"bSortable": true,"sWidth": "40%","sTitle":"Nome","bVisible": true},
        { "aTargets": [2], "bSearchable": true,"bSortable": false,"sWidth": "20%","sTitle":"CPF/CNPJ","bVisible": true},     
        { "aTargets": [3], "bSearchable": false,"bSortable": true,"sWidth": "20%","sTitle":"CIDADE","bVisible": true},    
        { "aTargets": [4], "bSearchable": false,"bSortable": true,"sWidth": "4%","sTitle":"UF","bVisible": true}, 
        { "aTargets": [5], "bSearchable": false,"bSortable": true,"sWidth": "4%","sTitle":"id","bVisible": false},        
        ], 
        
    'paging': true,
    });   
}
function resetForm()
{
  $("#form_addcliente").each(function(){
    this.reset();
  });
}
$("#menuAdd_cliente").on("click", function()
{
    s.mostrar("#main1");
    optionPessoa(0);
    optionUrl = "fornecedores/addCliente";

    
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
$("input[name=input_pessoa]").on("click", function()
    {
        var option = $(this).val();                 
        optionPessoa(option);
    });
$("#form_addcliente").submit(function(e)
{     e.preventDefault();
     var serializarDados = $('#form_addcliente').serialize();
     var token = $("#token").val();     
     //console.log(serializarDados);
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
    $('#tbl_clientes').DataTable().clear().draw();
    var token = $("#token").val();
    $.post('fornecedores/getcliente', {"all":"all","token":token}, function(response)
    {   
        
        if(response.length == 0 ){
            $('#tbl_clientes').addClass("hide");
        }else
        {
            $('#tbl_clientes').removeClass("hide");
        }
        try
        {             
            response = JSON.parse(response); 
            var tam = response.length
            for(var x=0; x<tam; x++)
            {   
                if(response[x].CPF == "" || response[x].CPF == null)
                {                     
                    response[x].CPF = response[x].CNPJ;
                }                
                var edit = " <button class='btn_trEditar'id='"+response[x].ID+"' onclick='editar(this.id)'><span class='glyphicon glyphicon-edit' ></span></button>";
                var excluir = "    <button class='btn_trExcluir'id='"+response[x].ID+"'  data-v='"+response[x].NOME+"' onclick='excluir(this.id, this)'><span class='glyphicon glyphicon-trash'></span></button>";           
                $('#tbl_clientes').DataTable().row.add([    
                edit+excluir,
                response[x].NOME,   
                response[x].CPF,
                response[x].CIDADE,
                response[x].UF,
                response[x].ID,
                ]).draw(false);
            }                  
        }
        catch(err) 
        {
            $('#tbl_clientes').addClass("hide");
        }
        if(response.length == 0 ){$('#tbl_clientes').addClass("hide");
    }
    });
}
current_page();
val();
$("button").on("click", function()
    {
        console.log("clicou no botao");      
    });
$("#btnCancelar_client").on("click", function(){
    s.mostrar("#main0");
    optionUrl = '';
    resetForm();
});


                
         