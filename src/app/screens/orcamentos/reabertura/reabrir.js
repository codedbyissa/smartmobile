import { Alert, Text, Modal, View, Button, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useContext  } from "react";
import {Container, TopContainer, ContainerModal,  ContainerControlCliente, ContainerLabCliente, ContainerSelectCliente, 
Items, DataContent, ContainerControl, ContainerLab, ContainerInput, ContainerSelect, InputLab, EstoqueInputLab, 
Input, ContainerRadio, RadioLab, RadioCont, ContainerDisplay, DisplayCont, DisplayLab, DisplayLabDesc, DisplayLabAcrs,
ValueLab, Icon, Icons, Save, SaveLab, LabSelect, SetSelect, Back, BackLab, DataView, Selected, DataEstoque, 
EstoqueLab, ProductContent, CartContent, DataLabC, DataReplyLabC, RemoveProd, BarContent, CartLength, CleanCart, 
CleanLab, Length, LengthLab, Length2, LengthLab2, VendaContent, ContainerVendaModal, Close, Confirm, VendaForm,
ContainerRadioFinal, RadioContFinal, ContainDisplay, InputFinal, ContainerDisplayFinal, DisplayContFinal, 
SenhaContent, ObsContent, ObsContents, ContainerInputSenha, InputSenha, InputObs, ObsCart, ObsLab, SearchInputProd, ErrorMensage } from "../../../styles/atendimento";
import { SearchInput, ContainerSearch, DataLab, DataReplyLab } from "../../../styles/crud";
import { BarCode } from "../../preco/styles/custom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBasketShopping, faCaretDown, faCircleCheck, faCircle, faBarcode, faMagnifyingGlass, faCirclePlus, faCircleMinus, faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { RadioButton } from 'react-native-paper';
import { useQuery, QueryClient, useInfiniteQuery, QueryClientProvider } from "react-query";
import { useNavigation } from '@react-navigation/native';
import Scanner from "../../preco/scanner";
import { FlashList } from "@shopify/flash-list";
import { ConfigContext } from '../../../context/config';
import { AuthenticationContext } from '../../../context/authentication';

function ReabrirOrcamento({route}) {
  
  return (  
    <QueryClientProvider client={queryClient}>
      <Conteudo cod={route.params.cod}/>
    </QueryClientProvider>
   
  )
}

// variaveis constantes

const queryClient = new QueryClient()
const senha = 'abc123';

// checar se a api esta online

async function get(baseUrl) {
  const response = await fetch(
    `http://${baseUrl}`
  );

   return response.json(); 

}

// listar orcamentos

async function getOrcamentos([cod, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000056/${cod}`
  );

   return response.json(); 

}

// listar clientes

async function getClientes([pageParam, searchParam, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000007?s=${searchParam}&page=${pageParam}`
  );

   return response.json(); 

}

// cliente selecionado

async function getCliente([clienteId, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000007/${clienteId}`
  );
  
  return response.json();
}

// listar produto

async function getProdutos([pageParam, searchParam, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000025/?s=${searchParam}&page=${pageParam}`
  );
  return response.json();
}

// produto selecionado

async function getProduto([produtoId, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000025/${produtoId}`
  );
  return response.json();
}

// capturar desconto maximo do produto selecionado

async function getProdutoMaxDesconto([produtoId, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000001/${produtoId}`
  );
  return response.json();
}

// listar setores

async function getSetores([produtoId, pageParam, searchParam, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000133/${produtoId}?s=${searchParam}&page=${pageParam}`
  );
  return response.json();
}

// setor selecionado

async function getSetor([setorId, baseUrl]) {
  const response = await fetch(
    `http://${baseUrl}/C000133/setor/${setorId}`
  );
  return response.json();
}

// capturar estoque do produto selecionado com base no setor

async function getEstoque([ produtoId, setorId, baseUrl ]) {
  const response = await fetch(
    `http://${baseUrl}/C000100/${produtoId}/${setorId}`
  );
  return response.json();
}

// conteudo do atendimento

const Conteudo = (props) => {

  const navigation = useNavigation(); // navigation
  const { baseUrl, appInfo, setInfoApp } = useContext(ConfigContext)
  const { user, userPermissions } = useContext(AuthenticationContext)

  // Formulario Inicial

  const [selectedCliente, setSelectedCliente] = useState(1); // cliente selecionada
  const [selectedProd, setSelectedProd] = useState(0); // produto selecionado
  const [selectedSetor, setSelectedSetor] = useState(0); // setor selecionado
  const [tipoddesconto, setTipoddesconto] = useState(''); // tipo de desconto selecionado
  const [quntd, setQuntd] = useState(1); // quantidade do produto
  const [prcntg, setPrcntg] = useState(0); // desconto do produto em %
  const [reais, setReais] = useState(0); // desconto do produto em R$
  const [erroMensag, setErroMensag] = useState(false); // mensagem de erro para quando campos obrigatorios não são preenchidos
  const [informSenhaMensag, setInformSenhaMensag] = useState(false); // mensagem de erro para quando o campo de senha não é preenchida
  const [erroSenhaMensag, setErroSenhaMensag] = useState(false); // mensagem de erro para quando a senhaé informada mas não está correta
  const [inputsenha, SetInputsenha] = useState(''); // campo da senha
  const [productsCart, setProductsCart] = useState([]); // produtos no carrinho

  // Formulario Final
  
  const [tipoddesconto_final, setTipoddesconto_final] = useState(''); // tipo de desconto final selecionado
  const [tipodacrescimo_final, setTipodacrescimo_final] = useState(''); // tipo de acrescimo final selecionado
  const [desprcntg, setDesPrcntg] = useState(0); // desconto final em %
  const [desreais, setDesReais] = useState(0); // desconto final em R$
  const [acrsprcntg, setAcrsPrcntg] = useState(0); // acréscimo final em %
  const [acrsreais, setAcrsReais] = useState(0); // acréscimo final R$
  const [inputobs, SetInputobs] = useState(''); // campo de observações

  // Modal

  const [clientModal, setClientModal] = useState(false); // modal clientes
  const [prodModal, setProdModal] = useState(false); // modal produtos
  const [setorModal, setSetorModal] = useState(false); // modal setores
  const [scannerModal, setScannerModal] = useState(false); // modal scanner codigo de barras dos produtos
  const [cartModal, setCartModal] = useState(false); // modal carrinho dos produtos
  const [senhaModal, setSenhaModal] = useState(false); // modal senha (inicial)
  const [senhaFinalModal, setSenhaFinalModal] = useState(false); // modal senha (final)
  const [finishingModal, setFinishingModal] = useState(false); // modal fechar orcamento
  const [obsModal, setObsModal] = useState(false); // modal observações

  // Buscas

  const [searchClient, setSearchClient] = useState(''); // buscar clientes
  const [searchProd, setSearchProd] = useState(''); // buscar produtos
  const [searchSetores, setSearchSetores] = useState(''); // buscar setores
  

   // query orcamentos
  const orcamentos = useQuery( 
    ["orcamentos", props.cod, baseUrl ], () => getOrcamentos([props.cod, baseUrl]), {
      staleTime: 2000, cacheTime: 1000,
      onSuccess: ((data) => {
        if (data) {
          const copyProductsCart = data.orcamentos.map((p, index) => ({
            id: index + 1,
            acrescimo: p.ACRESCIMO,
            cod: p.CODPRODUTO,
            codbarra_produto: p.CODBARRA,
            codsubgrupo_produto: p.CODSUBGRUPO,
            desconto: p.DESCONTO,
            desconto_maximo: "",
            dprcntg: (100 * parseFloat(p.DESCONTO.replace(",", ".")) / parseFloat(p.TOTAL.replace(",", "."))).toFixed(2),
            produto: p.produto.PRODUTO,
            quntd: p.QTDE,
            setor: p.setor.SETOR,
            setorcod: p.CODSETOR,
            situacao_produto: p.SITUACAO,
            tipoddesconto: "reais",
            total: p.TOTAL,
            unidade_produto: p.UNIDADE,
          }));
    
          setSelectedCliente(data.CODCLIENTE);
          SetInputobs(data.OBS);
          setProductsCart(copyProductsCart)
        }
      })
    },
  );

  
  // query clientes
  const clientes = useInfiniteQuery(    
    ["clientes", searchClient, baseUrl ], ({ pageParam = 1 }) => getClientes([pageParam, searchClient, baseUrl]), 
    { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
    {staleTime: 5000, cacheTime: 4000 },
  );

  // load clientes
  const loadMoreClientes = () => {  if (clientes.hasNextPage) {  clientes.fetchNextPage();  }  };

  // query cliente selecionado
  const cliente = useQuery( 
    ["cliente", selectedCliente, baseUrl], () => getCliente([selectedCliente, baseUrl]), {
      staleTime: 5000, cacheTime: 4000,
    },
  );

  // query produtos
  const produtos = useInfiniteQuery( 
    ["produtos", searchProd, baseUrl], ({ pageParam = 1 }) => getProdutos([pageParam, searchProd, baseUrl]), 
    { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
    { staleTime: 5000, cacheTime: 4000 },
  );

  // load produtos
  const loadMoreProdutos = () => {  if (produtos.hasNextPage) {  produtos.fetchNextPage();  }  };

  // quey produto selecionado
  const produto = useQuery( 
    ["produto", selectedProd, baseUrl], () => getProduto([selectedProd, baseUrl]), {
      staleTime: 5000, cacheTime: 4000
    },
  );

  // query desconto maximo do produto selecionado
  const MaxDescont = useQuery( 
    ["produtoMaxDescont", selectedProd, baseUrl], () => getProdutoMaxDesconto([selectedProd, baseUrl]), {
      staleTime: 5000, cacheTime: 4000
    },
  );

  // query setores
  const setores = useInfiniteQuery( 
    ["setores", selectedProd, searchSetores, baseUrl], ({ pageParam = 1 }) => getSetores([selectedProd, pageParam, searchSetores, baseUrl]),  
    { getNextPageParam: (page) => (page.current_page === page.last_page ? null : page.current_page + 1 ) },
    { staleTime: 5000, cacheTime: 4000 },
  );

  // load setores
  const loadMoreSetores = () => {  if (setores.hasNextPage) {  setores.fetchNextPage();  }  };

  // query setor selecionado
  const setor = useQuery( 
    ["setor", selectedSetor, baseUrl], () => getSetor([selectedSetor, baseUrl]), {
      staleTime: 5000, cacheTime: 4000
    },
    
  );

  // query estoque do produto selecionado com base no setor
  const estoque = useQuery( 
    ["estoque", selectedProd, selectedSetor, baseUrl], () => getEstoque([ selectedProd, selectedSetor, baseUrl ]), {
      staleTime: 5000, cacheTime: 4000
    },
  );
  
  // condição para escolher um setor para o produto selecionado
  useEffect(() => {
    
    if(setores.isSuccess && (setores.data.pages.map((page) => page.total)).flat()[0] == 1) {
      const get = (setores.data.pages.map((page) => page.data)).flat()[0]
      setSelectedSetor(get.CODIGO) } else if(setores.isSuccess && (setores.data.pages.map((page) => page.total)).flat()[0] == 0){ setSelectedSetor(0) }

    }, [setores]);

  
  // adicionar produto ao carrinho
  function addProducToCart([cod, produto, codbarra, codsubgrupo, unidade, situacao, maxdescont, setorcod, setor, quntd, tipoddesconto, desconto, dprcntg, valorTotal ]) {
    const copyProductsCart = [...productsCart];

      copyProductsCart.push({ id: (productsCart).length + 1, cod: cod, produto: produto, codbarra_produto: codbarra, codsubgrupo_produto: codsubgrupo, unidade_produto: unidade, situacao_produto: situacao, desconto_maximo: maxdescont, setorcod: setorcod, setor: setor, quntd: parseInt(quntd), tipoddesconto: tipoddesconto, desconto: desconto.toString().replace(".", ","), acrescimo: "", dprcntg: dprcntg.toString().replace(".", ","), total: valorTotal });

    setProductsCart(copyProductsCart);
  }

  // remover produto ao carrinho
  function removeProductToCart(id) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id
      );
      setProductsCart(arrayFiltered);
    
  }

  // limpar produto ao carrinho
  function clearCart() {
    setProductsCart([]);
  }

  // requisitos para adicionar produtos no carrinho
  const requirementsCheck = () => {

    // exibir mensagem de erro caso os campos requisitados não sejam preenchidos, não permitindo adicionar ao carrinho.
    if(quntd == '' || selectedProd == 0 || selectedSetor == 0) {
      setErroMensag(true)

  } else {

    // caso a condição acima não seja satisfeita e um desconto não seja dado, adicionar produto ao carrinho.
    if(tipoddesconto == '' || dprcntg == 0){
      
      setErroMensag(false)
      addProducToCart([selectedProd, produto.data.PRODUTO, produto.data.CODBARRA, produto.data.CODSUBGRUPO, produto.data.UNIDADE, 1, MaxDescont.data.DESCONTO_PRODUTO, selectedSetor, setor.data.SETOR, quntd, tipoddesconto, desconto, dprcntg, valorTotal ])

    }

    // caso contrario conferir se o desconto dado é menor, superior ou igual ao limite preestabelecido por produto
    else {

      const MaxiDescont = parseFloat(MaxDescont.data.DESCONTO_PRODUTO.replace(",", ".")) * 100
      const Descont = parseFloat(dprcntg) * 100

      // caso seja menor ou igual, permitir o desconto e adicionar produto ao carrinho
      if(MaxiDescont >= Descont) {

        setErroMensag(false)
        addProducToCart([selectedProd, produto.data.PRODUTO, produto.data.CODBARRA, produto.data.CODSUBGRUPO, produto.data.UNIDADE, 1, MaxDescont.data.DESCONTO_PRODUTO, selectedSetor, setor.data.SETOR, quntd, tipoddesconto, desconto, dprcntg, valorTotal ])

      } else {

        // caso o desconto seja superior, solicitar senha.
        setSenhaModal(true)
  
      }

    }
  } }

  // checar senha antes de add produto.

  const SenhaCheck = () => {

    // para caso o campo da senha esteja vazio
    if(inputsenha == '') {

      setErroSenhaMensag(false)
      setInformSenhaMensag(true)

    
    } else {

      // para caso a senha fornecida esteja correta 
      if(inputsenha == user.SENHA_MOBILE) {

        setInformSenhaMensag(false)
        setErroSenhaMensag(false)
        addProducToCart([selectedProd, produto.data.PRODUTO, produto.data.CODBARRA, produto.data.CODSUBGRUPO, produto.data.UNIDADE, 1, MaxDescont.data.DESCONTO_PRODUTO, selectedSetor, setor.data.SETOR, quntd, tipoddesconto, desconto, dprcntg, valorTotal ])
        setSenhaModal(false)
        SetInputsenha('')
        setErroMensag(false)

      }

      // para caso a senha fornecida esteja errada 
      else {
        setInformSenhaMensag(false)
        setErroSenhaMensag(true)

      }
    }
    
  }

    // checar senha antes de salvar.

  const SenhaCheckFinal = () => {
    
    // para caso o campo da senha esteja vazio
    if(inputsenha == '') {

      setErroSenhaMensag(false)
      setInformSenhaMensag(true)

    } else {

       // para caso a senha fornecida esteja correta 
      if(inputsenha == user.SENHA_MOBILE) {
      
        setSenhaFinalModal(false)
        SetInputsenha('')
        setInformSenhaMensag(false)
        setErroSenhaMensag(false)

  /* Logica para distribuir desconto e/ou acrescimo entre os produtos do carrinhos  */

    // extrair preço total dos produtos
   const total_prod = productsCart.map((item) => parseFloat(item.total.replace(",", ".")).toFixed(2))

   // calcular quanto % cada produto representa no total final
   const prcntg_total_prod = productsCart.map((item) => ((parseFloat(item.total.replace(",", ".")) * 100) / parseFloat(SubTotal.replace(",", "."))).toFixed(2)  )

   // obter do desconto final o valor referente a % anterior 
   const desc_prod = prcntg_total_prod.map((item) => ((item * descontoFinal) / 100).toFixed(2))

    // obter do acrescimo final o valor referente a % anterior 
    const acres_prod = prcntg_total_prod.map((item) => ((item * acrescimoFinal) / 100).toFixed(2))

        // distribuir desconto entre eles

        function add_desc(){

          const copyProductsCart = [...productsCart];
      
          const item = [];
      
          for (var i=0; i < productsCart.length; i++) {   item.push(
            
            parseFloat(copyProductsCart[i].desconto.toString().replace(",", ".")) + parseFloat(desc_prod[i])
            
            )  }
         return item;
        
         }
      
       // calcular total final apos desconto e acrescimo

         function set_axd(){
      
          const copyProductsCart = [...productsCart];
      
          for (var i=0; i < productsCart.length; i++) { 
            
           copyProductsCart[i].desconto = (add_desc()[i]).toFixed(2).toString().replace(".", ",")
           copyProductsCart[i].acrescimo = acres_prod[i].toString().replace(".", ",")
           copyProductsCart[i].total = ( parseFloat(copyProductsCart[i].total.replace(",", ".")) - parseFloat(desc_prod[i]) 
            + parseFloat(acres_prod[i] )).toFixed(2).replace(".", ",")
            
              }
         return copyProductsCart;
        
         }

         // salvar
      
         setProductsCart(set_axd());
         fetch(`http://${baseUrl}/C000056/${props.cod}`, {
          method: 'PUT',
          body: JSON.stringify({
            CODCLIENTE: selectedCliente,
            DESCONTO: (descontoFinal).toString().replace(".", ","),
            ACRESCIMO: (acrescimoFinal).toString().replace(".", ","),
            SUBTOTAL: SubTotal,
            TOTAL: Total,
            OBS: inputobs
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            SalvarOrcamentoProduto(json.CODIGO)
          } );       

      } else {
        setInformSenhaMensag(false)
        setErroSenhaMensag(true)

      }
    }
    
  }

  const SalvarOrcamento = () => {

    // extrair preço total dos produtos
   const total_prod = productsCart.map((item) => parseFloat(item.total.replace(",", ".")).toFixed(2))

   // calcular quanto % cada produto representa no total final
   const prcntg_total_prod = productsCart.map((item) => ((parseFloat(item.total.replace(",", ".")) * 100) / parseFloat(SubTotal.replace(",", "."))).toFixed(2)  )

   // obter do desconto final o valor referente a % anterior 
   const desc_prod = prcntg_total_prod.map((item) => ((item * descontoFinal) / 100).toFixed(2))

    // obter do acrescimo final o valor referente a % anterior 
    const acres_prod = prcntg_total_prod.map((item) => ((item * acrescimoFinal) / 100).toFixed(2))

   // somar o desconto dado ao produto individualmente e o desconto final ja fragmentado. 

   function operacion_add_desc(){

    const copyProductsCart = [...productsCart];

    const item = [];

    for (var i=0; i < productsCart.length; i++) {   item.push(
      
      parseFloat(copyProductsCart[i].desconto.replace(",", ".")) + parseFloat(desc_prod[i])
      
      )  }
   return item;

    
   }

   // calcular quanto esse novo desconto representa do valor do produto


   function operacion_desc_prcntg(){

    const item = [];

    for (var i=0; i < productsCart.length; i++) {   item.push(
      
      operacion_add_desc()[i] * 100 / parseFloat(total_prod[i])
      
      )  }
   return item;

   }

//Retorna false caso a % de desconto seja maior que o permitido

const desconto_maximo = productsCart.map((item) => parseFloat(item.desconto_maximo.replace(",", ".")) )
const desconto_recebido = operacion_desc_prcntg()

function operacion_cond_prod(){

  const item = [];

     for (var i=0; i < total_prod.length; i++) { item.push(
      desconto_maximo[i] >= desconto_recebido[i]
       )  }
     return item;
 }

  //checar se o desconto dado ultrapassa o desconto maximo por produto

  if(!operacion_cond_prod().includes(false) || descontoFinal == '' || descontoFinal == 0 ) {
 
function add_desc(){

  const copyProductsCart = [...productsCart];

  const item = [];

  for (var i=0; i < productsCart.length; i++) {   item.push(
    
    parseFloat(copyProductsCart[i].desconto.toString().replace(",", ".")) + parseFloat(desc_prod[i])
    
    )  }
 return item;

 }


 function set_axd(){

  const copyProductsCart = [...productsCart];

  for (var i=0; i < productsCart.length; i++) { 
    
   copyProductsCart[i].desconto = (add_desc()[i]).toFixed(2).toString().replace(".", ",")
   copyProductsCart[i].acrescimo = acres_prod[i].toString().replace(".", ",")
   copyProductsCart[i].total = ( parseFloat(copyProductsCart[i].total.replace(",", ".")) - parseFloat(desc_prod[i]) 
    + parseFloat(acres_prod[i] )).toFixed(2).replace(".", ",")
    
      }
 return copyProductsCart;

 }

 setProductsCart(set_axd());

 fetch(`http://${baseUrl}/C000056/${props.cod}`, {
  method: 'PUT',
  body: JSON.stringify({
    CODCLIENTE: selectedCliente,
    DESCONTO: (descontoFinal).toString().replace(".", ","),
    ACRESCIMO: (acrescimoFinal).toString().replace(".", ","),
    SUBTOTAL: SubTotal,
    TOTAL: Total,
    OBS: inputobs
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    SalvarOrcamentoProduto(json.CODIGO)
  } );
  
   } else {
    setSenhaFinalModal(true)
  }
}

  function SalvarOrcamentoProduto(codorc)

  {   

      fetch(`http://${baseUrl}/C000057`, {
        method: 'POST',
        body: JSON.stringify({
          PRODUTOS: productsCart,
          CODORCAMENTO: codorc,
          TIPO: 4,
          TERMINAL: '0',
          OBS: inputobs,
          ATB: '000001'
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
     
     Alert.alert(
      "Atualização bem sucedida",
      'O Orçamento de numero ' + codorc + ' foi atualizado com sucesso.',
      [ 
        { text: "Voltar", onPress: () => navigation.navigate('Start') }
      ]
    );
  
  }


  const onCodeScanned = (type, data) => {       
    setScannerModal(false);
    setSearchProd(data);        
  };
  
  const renderSpinner = () => { return <View style={{flex:1,
    backgroundColor:appInfo.cor_de_fundo,
    alignItems:'center',
    justifyContent:'center', }}>   
    <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
    </View>;  }; 
  
  const quantidade = produto.data === undefined? 0 : quntd === ''? parseFloat(produto.data.PRECOVENDA?.replace(",", ".")) * 1 : parseFloat(produto.data.PRECOVENDA?.replace(",", ".")) * parseFloat(quntd)
  const desconto = parseFloat(tipoddesconto === 'reais'? reais === ''? 0 : reais : tipoddesconto === 'prcntg'? prcntg === ''? 0 : (quantidade * prcntg / 100).toFixed(2) : 0).toFixed(2) 
  const dprcntg = tipoddesconto === 'prcntg'? prcntg === ''? 0 : prcntg : tipoddesconto === 'reais'? reais === ''? 0 : (100 *reais / quantidade).toFixed(2) : 0 
  const valorTotal = ((parseFloat(quantidade) - desconto).toFixed(2)).replace(".", ",")

  const rxp = reais === ''? null : '- ' + (100 * parseFloat(reais) / quantidade).toFixed(2) + '%'
  const pxr = prcntg === ''? null : '- ' + (quantidade * parseFloat(prcntg) / 100).toFixed(2) + 'R$'

  //

  const TotalProd = productsCart.map( (item) => parseFloat((item.total).replace(",", ".")) )
  const SubTotal = (TotalProd.reduce((partialSum, a) => partialSum + a, 0).toFixed(2)).toString().replace(".", ",")
  const descontoFinal = parseFloat(tipoddesconto_final === 'reais'? desreais === ''? 0 : desreais : tipoddesconto_final === 'prcntg'? desprcntg === ''? 0 : (parseFloat(SubTotal.replace(",", ".")) * desprcntg / 100).toFixed(2) : 0).toFixed(2)
  const acrescimoFinal = parseFloat(tipodacrescimo_final === 'reais'? acrsreais === ''? 0 : acrsreais : tipodacrescimo_final === 'prcntg'? acrsprcntg === ''? 0 : (parseFloat(SubTotal.replace(",", ".")) * acrsprcntg / 100).toFixed(2) : 0).toFixed(2)
  const Total = ((parseFloat(acrescimoFinal) + parseFloat(SubTotal.replace(",", ".")) - parseFloat(descontoFinal)).toFixed(2)).replace(".", ",")
  
  const rxp_des = desreais === '' || SubTotal === '0,00'? null : '- ' +  ((100 * desreais / parseFloat(SubTotal.replace(",", "."))).toFixed(2)).replace(".", ",") + '%'
  const pxr_des = desprcntg === '' || SubTotal === '0,00'? null : '- ' + ((parseFloat(SubTotal.replace(",", ".")) * desprcntg / 100).toFixed(2)).replace(".", ",") + 'R$'
  const rxp_acrs = acrsreais === '' || SubTotal === '0,00'? null : '+ ' + ((100 * acrsreais / parseFloat(SubTotal.replace(",", "."))).toFixed(2)).replace(".", ",") + '%'
  const pxr_acrs = acrsprcntg === '' || SubTotal === '0,00'? null : '+ ' + ((parseFloat(SubTotal.replace(",", ".")) * acrsprcntg / 100).toFixed(2)).replace(".", ",") + 'R$'

  const { control, handleSubmit, formState: { errors } } = useForm({ })



  if (orcamentos.isLoading) {
    return (
      <View style={{flex:1,
      backgroundColor:appInfo.cor_de_fundo,
      alignItems:'center',
      justifyContent:'center', }}>   
      <ActivityIndicator size="large" color={ appInfo.cor_segundaria } />
      </View>
    )
  }
  if (orcamentos.isError) {
    return (
      <View style={{flex:1,
        backgroundColor: appInfo.cor_de_fundo,
        alignItems:'center',
        justifyContent:'center', }}>
      <LabSelect style={{color: appInfo.cor_principal }}> Tente Novamente </LabSelect>
      </View>
    )

  }
  if (orcamentos.isSuccess) {

     
return (
  
  <Container  style={{ backgroundColor: appInfo.cor_de_fundo }}> 

  { erroMensag == true? <ErrorMensage> os campos destacados são obrigatórios </ErrorMensage> : null }       

<ContainerControlCliente style={{color: appInfo.cor_principal }}>
<ContainerLabCliente style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> Cliente </InputLab>
</ContainerLabCliente>         
<ContainerSelectCliente style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }} onPress={() => setClientModal(true)}>

{cliente.data == undefined?
<LabSelect style={{color: appInfo.cor_principal }}> Selecione por favor </LabSelect> : 
<LabSelect style={{color: appInfo.cor_principal }}> {cliente.data.NOME} {cliente.data.APELIDO} </LabSelect> } 

<SetSelect>
<FontAwesomeIcon icon={faMagnifyingGlass}  size={ 15 } color={appInfo.cor_principal}/>
</SetSelect>
</ContainerSelectCliente>
</ContainerControlCliente>

<Modal
statusBarTranslucent={true}        
visible={clientModal}
transparent={true}
animationType="fade"
onRequestClose={() => setClientModal(false)}>

<ContainerModal style={{ backgroundColor: appInfo.cor_de_fundo }}>


<TopContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
<ContainerSearch style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
<FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={appInfo.cor_principal}/>
</ContainerSearch>                       
<SearchInput
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
placeholder='Buscar Cliente'
placeholderTextColor={appInfo.cor_principal}
name={searchClient}
onChangeText={(t) => setSearchClient(t)}/>                          
</TopContainer>

<DataView>  

{clientes.isSuccess? <FlashList
onEndReached={loadMoreClientes}
estimatedItemSize={200}
onEndReachedThreshold={0.5}
ListFooterComponent={clientes.isFetching ? renderSpinner : null}
data={(clientes.data.pages.map((page) => page.data)).flat()}    
keyExtractor={(item) => item.CODIGO}    
renderItem={({ item }) => {
return <View style={{ margin: 10 }}>
<View style={{ width: '90%' }}>
<DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
<DataLab style={{color: appInfo.cor_principal }}> Cliente: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.NOME} {item.APELIDO} </DataReplyLab> </DataLab>
<DataLab style={{color: appInfo.cor_principal }}> CPF: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CPF} </DataReplyLab> </DataLab>
</View>
{item.CODIGO == selectedCliente? <Selected>
<FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_principal }/>       
</Selected> : <Selected onPress={() => setSelectedCliente(item.CODIGO)}>
<FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>       
</Selected> }
</View>;
}}/> : <View style={{flex:1,
backgroundColor:appInfo.cor_de_fundo,
alignItems:'center',
justifyContent:'center', }}>   
<ActivityIndicator size="large" color={appInfo.cor_segundaria} />
</View>  }

</DataView>

</ContainerModal>       
<Back style={{backgroundColor: appInfo.cor_principal }} onPress={() => setClientModal(false)}>
<BackLab style={{ color: appInfo.cor_de_fundo }}> Voltar </BackLab>
</Back>

</Modal>     

<Icons>

<Icon style={{backgroundColor: appInfo.cor_principal }} onPress={() => setCartModal(true)}>
<FontAwesomeIcon icon={faBasketShopping}  size={ 25 } color={ appInfo.cor_de_fundo }/>
<Length2>
<FontAwesomeIcon icon={faCircle}  size={ 25 } color={ appInfo.cor_segundaria }/>
<LengthLab2> {(productsCart).length} </LengthLab2>
</Length2>
</Icon>
</Icons>

<Modal
statusBarTranslucent={true}    
visible={cartModal}
transparent={true}
animationType="fade"
onRequestClose={() => setCartModal(false)}>

<ContainerModal style={{ backgroundColor: appInfo.cor_de_fundo }}>

<BarContent style={{ backgroundColor: appInfo.cor_de_fundo }}>
<CartLength>
<FontAwesomeIcon icon={faBasketShopping}  size={ 40 } color={ appInfo.cor_principal }/>
<Length>
<FontAwesomeIcon icon={faCircle}  size={ 25 } color={ appInfo.cor_segundaria }/>
<LengthLab> {(productsCart).length} </LengthLab>
</Length>
</CartLength>

<CleanCart onPress={() => clearCart()}>
<FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ appInfo.cor_principal }/>
<CleanLab style={{color: appInfo.cor_principal }}> Limpar Carrinho </CleanLab>
</CleanCart>


</BarContent>



<CartContent>


<FlashList
data={productsCart}
estimatedItemSize={200}    
keyExtractor={(item, index) =>  index.toString()}    
renderItem={({ item }) => {
return <View>

<ProductContent style={{backgroundColor: '#0000006b' }}>

<DataLabC style={{color: appInfo.cor_principal }}> Produto: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.produto} </DataReplyLabC> </DataLabC>
<DataLabC style={{color: appInfo.cor_principal }}> Setor: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.setor} </DataReplyLabC> </DataLabC>
<DataLabC style={{color: appInfo.cor_principal }}> Quantidade: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.quntd} </DataReplyLabC> </DataLabC>
<DataLabC style={{color: appInfo.cor_principal }}> Desconto: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> -{item.desconto} ({(item.dprcntg)}%) </DataReplyLabC> </DataLabC>
<DataLabC style={{color: appInfo.cor_principal }}> Total: <DataReplyLabC style={{color: appInfo.cor_segundaria }}> {item.total} </DataReplyLabC> </DataLabC>
<RemoveProd onPress={() => removeProductToCart(item.id)}>
<FontAwesomeIcon icon={faCircleMinus}  size={ 25 } color={ '#e95361' }/>  
</RemoveProd>
</ProductContent>
</View>
;
}}/>


</CartContent>

</ContainerModal>

<Back style={{backgroundColor: appInfo.cor_principal }} onPress={() => setCartModal(false)}>
<BackLab style={{ color: appInfo.cor_de_fundo }}> Voltar </BackLab>
</Back>

</Modal>

<DataContent style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}>

<Controller
control={control}
name="produto"
render={({ field: { onChange, OnBlur, value} }) => (   
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> Produtos { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
</ContainerLab>  
<ContainerSelect style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }} onPress={() => setProdModal(true)}>

{produto.data == undefined?
<LabSelect style={{color: appInfo.cor_principal }}> Selecione por favor </LabSelect> : 
<LabSelect style={{color: appInfo.cor_principal }}> { ((produto.data.PRODUTO).length > 19) ? 
        (((produto.data.PRODUTO).substring(0, 19)) + '...') : 
        produto.data.PRODUTO } </LabSelect> }

<SetSelect>
<FontAwesomeIcon icon={faMagnifyingGlass}  size={ 15 } color={ appInfo.cor_principal }/>
</SetSelect>

</ContainerSelect>
</ContainerControl>
)}/>

<Modal
statusBarTranslucent={true}          
visible={prodModal}
transparent={true}
animationType="fade"
onRequestClose={() => setProdModal(false)}>

<ContainerModal style={{ backgroundColor: appInfo.cor_de_fundo }}>

<TopContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
<ContainerSearch style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
<FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={ appInfo.cor_principal }/>
</ContainerSearch>                       
<SearchInput
style={{ backgroundColor: appInfo.cor_de_fundo, width: '60%', color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
placeholder='Buscar Produto'
placeholderTextColor={appInfo.cor_principal}
name={searchProd}
onChangeText={(t) => setSearchProd(t)}>{searchProd}</SearchInput>
<BarCode style={{backgroundColor: appInfo.cor_principal,  borderColor: appInfo.cor_principal }} onPress={() => setScannerModal(true)}>                               
<FontAwesomeIcon icon={faBarcode}  size={ 25 } color={ appInfo.cor_de_fundo }/>
</BarCode>                          
</TopContainer>

<DataView>

<View key={0} style={{ margin: 10 }}  onPress={() => { setSelectedSetor(''); setSelectedProd(0) }}>

<DataLab style={{color: appInfo.cor_principal }}> Selecione por favor </DataLab>

{selectedProd == 0? 
<Selected>
<FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_principal }/>       
</Selected> :
<Selected onPress={() => setSelectedProd(0)}>
<FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>       
</Selected>
}

</View>

{produtos.isSuccess? <FlashList
onEndReached={loadMoreProdutos}
estimatedItemSize={200}
onEndReachedThreshold={0.5}
ListFooterComponent={produtos.isFetching ? renderSpinner : null}
data={(produtos.data.pages.map((page) => page.data)).flat()}            
keyExtractor={item => item.CODIGO}
renderItem={({ item }) => {
return <View key={item.CODIGO} style={{ margin: 10 }}>
<View style={{ width: '90%' }}>
<DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
<DataLab style={{color: appInfo.cor_principal }}> Produto: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.PRODUTO} </DataReplyLab> </DataLab>
<DataLab style={{color: appInfo.cor_principal }}> Preço: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.PRECOVENDA} </DataReplyLab> </DataLab>
<DataLab style={{color: appInfo.cor_principal }}> Codbarra: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODBARRA} </DataReplyLab> </DataLab>
</View>
{item.CODIGO == selectedProd? 
<Selected>
<FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_principal }/>       
</Selected> :
<Selected onPress={() =>{ setSelectedProd(item.CODIGO); setSelectedSetor(0)}}>
<FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>       
</Selected>
}

</View>;
}}/> : <View style={{flex:1,
backgroundColor:appInfo.cor_de_fundo,
alignItems:'center',
justifyContent:'center', }}>   
<ActivityIndicator size="large" color={appInfo.cor_segundaria} />
</View>  }

</DataView>
</ContainerModal>
<Back style={{backgroundColor: appInfo.cor_principal }} onPress={() => setProdModal(false)}>
<BackLab style={{ color: appInfo.cor_de_fundo }}> Voltar </BackLab>
</Back>

</Modal>

<Modal 
statusBarTranslucent={true} 
visible={scannerModal}
transparent={true}
animationType="fade"
onRequestClose={() => setScannerModal(false)}>

<View style={{ flex: 1,
alignItems: "center",
justifyContent: "space-around",
backgroundColor: "lightgrey", }}>
<Scanner onCodeScanned={onCodeScanned} />
<Button title="Cancelar" color={appInfo.cor_principal} onPress={() => setScannerModal(false)} />
</View>
</Modal>

{setores.isSuccess && (setores.data.pages.map((page) => page.total)).flat()[0] > 1?

<Controller
control={control}
name="setor"
render={({ field: { onChange, OnBlur, value} }) => ( 
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> Setor { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
</ContainerLab>     
<ContainerSelect style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }} onPress={() => setSetorModal(true)}>

{setor.data == undefined || selectedSetor == 0?
<LabSelect style={{color: appInfo.cor_principal }}> Selecione por favor </LabSelect> : 
<LabSelect style={{color: appInfo.cor_principal }}> { ((setor.data.SETOR).length > 19) ? 
        (((setor.data.SETOR).substring(0, 19)) + '...') : 
        setor.data.SETOR } </LabSelect> }

<SetSelect>
<FontAwesomeIcon icon={faMagnifyingGlass}  size={ 15 } color={ appInfo.cor_principal }/>
</SetSelect>

</ContainerSelect>
</ContainerControl>
)}/>
: null
}  

<Modal 
statusBarTranslucent={true}   
visible={setorModal}
transparent={true}
animationType="fade"
onRequestClose={() => setSetorModal(false)}>

<ContainerModal style={{ backgroundColor: appInfo.cor_de_fundo }}>

<TopContainer style={{ backgroundColor: appInfo.cor_de_fundo }}>
<ContainerSearch style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}>
<FontAwesomeIcon icon={faMagnifyingGlass} size={ 25 } color={ appInfo.cor_principal }/>
</ContainerSearch>                       
<SearchInput
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
placeholder='Buscar Setor'
placeholderTextColor={appInfo.cor_principal}
name={searchSetores}
onChangeText={(t) => setSearchSetores(t)}/>                          
</TopContainer>

<DataView>

<DataEstoque>
{estoque.data == undefined || selectedSetor == 0?
<EstoqueLab style={{color: appInfo.cor_segundaria }}> Selecione um setor para visualizar o estoque </EstoqueLab> : 
<EstoqueLab style={{color: appInfo.cor_segundaria }}> Estoque atual: {estoque.data.ESTOQUE_ATUAL} </EstoqueLab> }
</DataEstoque>

<View key={0} style={{ margin: 10 }}>

<DataLab style={{color: appInfo.cor_segundaria }}> Selecione por favor </DataLab>

{selectedSetor == 0? 
<Selected>
<FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_principal }/>       
</Selected> :
<Selected onPress={() => setSelectedSetor(0)}>
<FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>       
</Selected>
}

</View>

{setores.isSuccess? <FlashList
onEndReached={loadMoreSetores}
estimatedItemSize={200}
onEndReachedThreshold={0.5}
ListFooterComponent={setores.isFetching ? renderSpinner : null}
data={(setores.data.pages.map((page) => page.data)).flat()}            
keyExtractor={item => item.CODIGO}
renderItem={({ item }) => { 
return <View key={item.CODIGO} style={{ margin: 10 }}  onPress={() => setSelectedSetor(item.CODIGO)}>
<View style={{ width: '90%' }}>
<DataLab style={{color: appInfo.cor_principal }}> Codigo: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.CODIGO} </DataReplyLab> </DataLab>
<DataLab style={{color: appInfo.cor_principal }}> Setor: <DataReplyLab style={{color: appInfo.cor_segundaria }}> {item.SETOR} </DataReplyLab> </DataLab>
</View>
{item.CODIGO == selectedSetor?
<Selected>
<FontAwesomeIcon icon={faCircleCheck}  size={ 35 } color={ appInfo.cor_principal }/>       
</Selected> :


<Selected onPress={() => setSelectedSetor(item.CODIGO)}>
<FontAwesomeIcon icon={faCircle}  size={ 35 } color={ '#c7c7c752' }/>      
</Selected>

}

</View>;
}}/> : <View style={{flex:1,
backgroundColor:appInfo.cor_de_fundo,
alignItems:'center',
justifyContent:'center', }}>   
<ActivityIndicator size="large" color={appInfo.cor_segundaria} />
</View>  }


</DataView>
</ContainerModal>
<Back style={{backgroundColor: appInfo.cor_principal }} onPress={() => setSetorModal(false)}>
<BackLab style={{ color: appInfo.cor_de_fundo }}> Voltar </BackLab>
</Back>

</Modal>  

<Controller
control={control}
name="quntd"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{ color: appInfo.cor_principal }}> Quantidade { erroMensag == true? <ErrorMensage> * </ErrorMensage> : null } </InputLab>
{ estoque.data == undefined? null  : <EstoqueInputLab style={{color: appInfo.cor_principal }}> (1 - {estoque.data.ESTOQUE_ATUAL}) </EstoqueInputLab>  }
</ContainerLab>      
<ContainerInput style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}>
<Input
style={{backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal }}
name={quntd}
onChangeText={(t) => setQuntd(t)}
keyboardType='numeric'
OnBlur={OnBlur}
value={value}
placeholder='Informe quantidade'
placeholderTextColor={appInfo.cor_principal}>{quntd}</Input>
</ContainerInput>
</ContainerControl>
)}/>

<Controller
control={control}
name="desc"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> Desconto </InputLab>
</ContainerLab>
<ContainerRadio style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}>
<RadioCont>
<RadioButton
color={appInfo.cor_principal }
value="prcntg"
status={ tipoddesconto === 'prcntg' ? 'checked' : 'unchecked' }
onPress={() => setTipoddesconto('prcntg') } />
<RadioLab style={{color: appInfo.cor_principal }}> % </RadioLab>
</RadioCont>
<RadioCont>
<RadioButton
color={appInfo.cor_principal}
value="reais"
status={ tipoddesconto === 'reais' ? 'checked' : 'unchecked' }
onPress={() => setTipoddesconto('reais') } />
<RadioLab style={{color: appInfo.cor_principal }}> R$ </RadioLab>
</RadioCont>
</ContainerRadio>
</ContainerControl>
)}/>

{tipoddesconto == 'prcntg'? 

<Controller
control={control}
name="prcntg"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> % </InputLab>
</ContainerLab>      
<ContainerInput style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}>
<Input
style={{backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal }}
keyboardType='numeric'
name={prcntg}
onChangeText={(t) => setPrcntg(t)}
OnBlur={OnBlur}
value={value}
placeholder='desconto em %'
placeholderTextColor={appInfo.cor_principal}>{prcntg}</Input>
</ContainerInput>
</ContainerControl>
)}/> : null }

{tipoddesconto == 'reais'? 

<Controller
control={control}
name="reais"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> R$ </InputLab>
</ContainerLab>      
<ContainerInput style={{color: appInfo.cor_principal, borderColor: appInfo.cor_principal }}>
<Input
style={{backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal }}
keyboardType='numeric'
name={reais}
onChangeText={(t) => setReais(t)}
OnBlur={OnBlur}
value={value}
placeholder='desconto em R$'
placeholderTextColor={appInfo.cor_principal}>{reais}</Input>
</ContainerInput>
</ContainerControl>
)}/> : null }

</DataContent>

<ContainerDisplay>
<DisplayCont>
<DisplayLab style={{color: appInfo.cor_principal }}> Preço(R$): </DisplayLab> 
{ produto.data === undefined? <ValueLab style={{color: appInfo.cor_principal }}> 0,00 </ValueLab> :
<ValueLab style={{color: appInfo.cor_principal }}> {produto.data.PRECOVENDA} </ValueLab>  }        
</DisplayCont>
<DisplayCont >
{ tipoddesconto === 'reais' ? <DisplayLab style={{color: appInfo.cor_principal }}> Total(R$): <DisplayLabDesc> {rxp} </DisplayLabDesc> </DisplayLab> :
tipoddesconto === 'prcntg' ?  <DisplayLab style={{color: appInfo.cor_principal }}> Total(R$): <DisplayLabDesc> {pxr} </DisplayLabDesc>  </DisplayLab> :
<DisplayLab style={{color: appInfo.cor_principal }}> Total(R$): </DisplayLab>  }
<ValueLab style={{color: appInfo.cor_principal }}> {valorTotal} </ValueLab> 
</DisplayCont>
</ContainerDisplay>

  <Icon style={{width: '90%', backgroundColor: appInfo.cor_principal }} onPress={requirementsCheck}>
    <FontAwesomeIcon icon={faCirclePlus} size={ 25 } color={ appInfo.cor_de_fundo }/>       
  </Icon>

<Save style={{backgroundColor: appInfo.cor_principal }} onPress={() => setFinishingModal(true)}>
<SaveLab style={{color: appInfo.cor_de_fundo}}> Fechar Orçamento </SaveLab>
</Save>

{/* Finalizar Orçamento */}

<Modal         
visible={finishingModal}
statusBarTranslucent={true} 
transparent={true}
animationType="fade"
onRequestClose={() => setFinishingModal(false)}>
<ContainerVendaModal>

<VendaContent style={{backgroundColor: appInfo.cor_de_fundo }}>

<Close onPress={() => setFinishingModal(false)}>       
<FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
</Close>


<VendaForm>

<ObsCart onPress={() => setObsModal(true) }>
<FontAwesomeIcon icon={faPenToSquare}  size={ 25 } color={appInfo.cor_principal}/>
<ObsLab style={{color: appInfo.cor_principal }}> Observações </ObsLab>
</ObsCart>


{/* Desconto */}

<Controller
control={control}
name="tipoddesconto_final"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> Desconto </InputLab>
</ContainerLab>
<ContainerRadioFinal>
<RadioContFinal>
<RadioButton
color={appInfo.cor_principal}
value="prcntg"
status={ tipoddesconto_final === 'prcntg' ? 'checked' : 'unchecked' }
onPress={() => setTipoddesconto_final('prcntg') } />
<RadioLab style={{color: appInfo.cor_principal }}> % </RadioLab>
</RadioContFinal>
<RadioContFinal>
<RadioButton
color={appInfo.cor_principal}
value="reais"
status={ tipoddesconto_final === 'reais' ? 'checked' : 'unchecked' }
onPress={() => setTipoddesconto_final('reais') } />
<RadioLab style={{color: appInfo.cor_principal }}> R$ </RadioLab>
</RadioContFinal>
</ContainerRadioFinal>
</ContainerControl>
)}/> 

{tipoddesconto_final == 'prcntg'?
<Controller
control={control}
name="desprcntg"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>     
<InputFinal
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
keyboardType='numeric'
name={desprcntg}
onChangeText={(t) => setDesPrcntg(t)}
OnBlur={OnBlur}
value={value}
placeholder='desconto em %'
placeholderTextColor={appInfo.cor_principal}>{desprcntg}</InputFinal>
</ContainerControl>
)}/> : null}

{tipoddesconto_final == 'reais'?
<Controller
control={control}
name="desreais"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>    
<InputFinal
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
keyboardType='numeric'
name={desreais}
onChangeText={(t) => setDesReais(t)}
OnBlur={OnBlur}
value={value}
placeholder='desconto em R$'
placeholderTextColor={appInfo.cor_principal}>{desreais}</InputFinal>

</ContainerControl>
)}/> : null}



{/* Acrescimo */}

<Controller
control={control}
name="tipodacrescimo_final"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>
<ContainerLab style={{color: appInfo.cor_principal }}>
<InputLab style={{color: appInfo.cor_principal }}> Acréscimo </InputLab>
</ContainerLab>
<ContainerRadioFinal>
<RadioContFinal>
<RadioButton
color={appInfo.cor_principal}
value="prcntg"
status={ tipodacrescimo_final === 'prcntg' ? 'checked' : 'unchecked' }
onPress={() => setTipodacrescimo_final('prcntg') } />
<RadioLab style={{color: appInfo.cor_principal }}> % </RadioLab>
</RadioContFinal>
<RadioContFinal>
<RadioButton
color={appInfo.cor_principal}
value="reais"
status={ tipodacrescimo_final === 'reais' ? 'checked' : 'unchecked' }
onPress={() => setTipodacrescimo_final('reais') } />
<RadioLab style={{color: appInfo.cor_principal }}> R$ </RadioLab>
</RadioContFinal>
</ContainerRadioFinal>
</ContainerControl>
)}/> 

{tipodacrescimo_final == 'prcntg'?
<Controller
control={control}
name="acrsprcntg"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>    
<InputFinal
style={{backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
keyboardType='numeric'
name={acrsprcntg}
onChangeText={(t) => setAcrsPrcntg(t)}
OnBlur={OnBlur}
value={value}
placeholder='acréscimo em %'
placeholderTextColor={appInfo.cor_principal}>{acrsprcntg}</InputFinal>
</ContainerControl>
)}/> : null}

{tipodacrescimo_final == 'reais'?
<Controller
control={control}
name="acrsreais"
render={({ field: { onChange, OnBlur, value} }) => (
<ContainerControl style={{color: appInfo.cor_principal }}>     
<InputFinal
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
keyboardType='numeric'
name={acrsreais}
onChangeText={(t) => setAcrsReais(t)}
OnBlur={OnBlur}
value={value}
placeholder='acréscimo em R$'
placeholderTextColor={appInfo.cor_principal}>{acrsreais}</InputFinal>
</ContainerControl>
)}/> : null}

<ContainerDisplayFinal>

<DisplayContFinal>
<DisplayLab style={{color: appInfo.cor_principal }}> SubTotal(R$): </DisplayLab> 
<ValueLab style={{color: appInfo.cor_principal }}> {SubTotal} </ValueLab>         
</DisplayContFinal>

<DisplayContFinal>
<DisplayLab style={{color: appInfo.cor_principal }}> Total(R$):  </DisplayLab>        
<ValueLab style={{color: appInfo.cor_principal }}> {Total} </ValueLab>     
</DisplayContFinal>

</ContainerDisplayFinal>



<ContainDisplay>
{ tipoddesconto_final === 'reais' ?
<DisplayLabDesc> {rxp_des} </DisplayLabDesc>
: tipoddesconto_final === 'prcntg' ?       
<DisplayLabDesc> {pxr_des} </DisplayLabDesc>
: null }
</ContainDisplay>


<ContainDisplay>
{ tipodacrescimo_final === 'reais' ?
<DisplayLabAcrs> {rxp_acrs} </DisplayLabAcrs>
: tipodacrescimo_final === 'prcntg' ?       
<DisplayLabAcrs> {pxr_acrs} </DisplayLabAcrs>
: null }
</ContainDisplay>


</VendaForm>

<Confirm  style={{backgroundColor: appInfo.cor_principal }} onPress={SalvarOrcamento}> 
<FontAwesomeIcon icon={faCircleCheck}  size={ 30 } color={ appInfo.cor_de_fundo }/>  
</Confirm>

</VendaContent>

</ContainerVendaModal> 

</Modal>

{/* Obs Modal */}


<Modal         
visible={obsModal}
transparent={true}
animationType="fade"
statusBarTranslucent={true} 
onRequestClose={() => setObsModal(false)}>

<ContainerVendaModal>

<ObsContents>

<ObsContent style={{backgroundColor: appInfo.cor_de_fundo }}>

<Close onPress={() => setObsModal(false)}>       
<FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
</Close>


<Controller
control={control}
name="inputobs"
render={({ field: { onChange, OnBlur, value} }) => (

<InputObs
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
name={inputobs}
multiline={true}
numberOfLines={10}
onChangeText={(t) => SetInputobs(t)}
OnBlur={OnBlur}
value={value}
placeholder='Observações'
placeholderTextColor={appInfo.cor_principal}>{inputobs}</InputObs>

)}/>


</ObsContent>

</ObsContents>


</ContainerVendaModal>


</Modal>

{/* Senha Modal */}


<Modal         
visible={senhaModal}
transparent={true}
animationType="fade"
statusBarTranslucent={true} 
onRequestClose={() => setSenhaModal(false)}>

<ContainerVendaModal>

{ userPermissions.includes('DarDescontoEspecial')? <SenhaContent style={{ backgroundColor: appInfo.cor_de_fundo }}>

<Close onPress={() => setSenhaModal(false)}>       
<FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
</Close>

<Controller
control={control}
name="inputsenha"
render={({ field: { onChange, OnBlur, value} }) => (     
<ContainerInputSenha>
<InputLab style={{color: appInfo.cor_principal }}> Senha Mobile: </InputLab>

<InputSenha
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
name={inputsenha}
onChangeText={(t) => SetInputsenha(t)}
OnBlur={OnBlur}
value={value}
placeholder='Informe sua senha'
placeholderTextColor={appInfo.cor_principal}>{inputsenha}</InputSenha>

</ContainerInputSenha>
)}/>

{ informSenhaMensag == true? <ErrorMensage>desconto não permitido, senha requerida</ErrorMensage> : null }
{ erroSenhaMensag == true? <ErrorMensage>desconto não permitido, senha errada</ErrorMensage> : null }

<Confirm style={{backgroundColor: appInfo.cor_principal }} onPress={SenhaCheck}> 
<FontAwesomeIcon icon={faCircleCheck}  size={ 30 } color={ appInfo.cor_de_fundo }/>  
</Confirm>


</SenhaContent> :
        <SenhaContent style={{ backgroundColor: appInfo.cor_de_fundo, padding: 15 }}>
          <Close onPress={() => setSenhaModal(false)}>       
        <FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
        </Close>

        { MaxDescont.isSuccess? <InputLab style={{color: appInfo.cor_principal, fontSize: 20, textAlign: 'justify' }}>Você não tem permissão para descontar esse valor, o desconto máximo que pode ser dado para esse produto é { MaxDescont.data.DESCONTO_PRODUTO }%</InputLab> : null}

        </SenhaContent>
        
        }


</ContainerVendaModal>


</Modal>

{/* Senha Final Modal */}


<Modal         
visible={senhaFinalModal}
transparent={true}
animationType="fade"
statusBarTranslucent={true} 
onRequestClose={() => setSenhaFinalModal(false)}>

<ContainerVendaModal>

{ userPermissions.includes('DarDescontoEspecial')? <SenhaContent style={{backgroundColor: appInfo.cor_de_fundo}}>

<Close onPress={() => setSenhaFinalModal(false)}>       
<FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
</Close>

<Controller
control={control}
name="inputsenha"
render={({ field: { onChange, OnBlur, value} }) => (     
<ContainerInputSenha>
<InputLab style={{color: appInfo.cor_principal }}> Senha Mobile: </InputLab>

<InputSenha
style={{ backgroundColor: appInfo.cor_de_fundo, color: appInfo.cor_principal,  borderColor: appInfo.cor_principal }}
name={inputsenha}
onChangeText={(t) => SetInputsenha(t)}
OnBlur={OnBlur}
value={value}
placeholder='Informe sua senha'
placeholderTextColor={appInfo.cor_principal}>{inputsenha}</InputSenha>

</ContainerInputSenha>
)}/>

{ informSenhaMensag == true? <ErrorMensage>desconto não permitido, senha requerida</ErrorMensage> : null }
{ erroSenhaMensag == true? <ErrorMensage>desconto não permitido, senha errada</ErrorMensage> : null }

<Confirm style={{backgroundColor: appInfo.cor_principal }} onPress={SenhaCheckFinal}> 
<FontAwesomeIcon icon={faCircleCheck}  size={ 30 } color={ appInfo.cor_de_fundo }/>  
</Confirm>


</SenhaContent> :
        <SenhaContent style={{ backgroundColor: appInfo.cor_de_fundo, padding: 15 }}>
          <Close onPress={() => setSenhaFinalModal(false)}>       
        <FontAwesomeIcon icon={faCircleXmark}  size={ 25 } color={ '#e95361' }/>
        </Close>

        { MaxDescont.isSuccess? <InputLab style={{color: appInfo.cor_principal, fontSize: 20, textAlign: 'justify' }}>Você não tem permissão para descontar esse valor, o desconto máximo que pode ser dado para esse orçamento é { Math.min(...descontos_maximos)}% </InputLab> : null}

        </SenhaContent>
        
        }


</ContainerVendaModal>


</Modal>


</Container>
 
    )
  }
}

export default ReabrirOrcamento;