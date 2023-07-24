const { response } = require("express");
const productoModel = require("../models/Producto");
const { Op, Sequelize } = require("sequelize");

var DomParser = require('dom-parser');
var parser = new DomParser();

const fetch = require('node-fetch');
// note: use npm install node-fetch@2.0 to be able to use "require"



const listarAccessPoint = (req, res) => {

    const { codigo_postal } = req.body;

    console.log(codigo_postal)


    let body = `<?xml version="1.0"?>
    <AccessRequest xml:lang="es-ES">
    <AccessLicenseNumber>EDC8C33AAB952E52</AccessLicenseNumber>
    <UserId>KOMO_UPS</UserId>
    <Password>jX$eatZ46pEx95!</Password>
    </AccessRequest>
    <?xml version="1.0"?>
    <LocatorRequest>
    <Request>
    <RequestAction>Locator</RequestAction>
    <RequestOption>64</RequestOption>
    <TransactionReference>
    <CustomerContext>XOLT Sample Code</CustomerContext>
    </TransactionReference>
    </Request>
    <OriginAddress>
    <AddressKeyFormat>
    <PostcodePrimaryLow>`+codigo_postal+`</PostcodePrimaryLow>
    <CountryCode>ES</CountryCode>
    </AddressKeyFormat>
    </OriginAddress>
    <Translate>
    <Locale>es_ES</Locale>
    </Translate>
    <UnitOfMeasurement>
    <Code>KM</Code>
    </UnitOfMeasurement>
    <LocationSearchCriteria>
    <SearchOption>
    <OptionType>
    <Code>02</Code>
    </OptionType>
    <OptionCode>
    <Code>002</Code>
    </OptionCode>
    </SearchOption>
    <MaximumListSize>2</MaximumListSize>
    <SearchRadius>100</SearchRadius>
    </LocationSearchCriteria>
    </LocatorRequest>`
    
    fetch('https://onlinetools.ups.com/ups.app/xml/Locator', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/xml'
        }
    })
    .then(res => res.text())
    .then(str => new parser.parseFromString(str, "text/xml"))
    .then(data => res.send(data));
    
  }

  const CalcularEnvioMBE = (req, res) => {

    const { codigo_postal } = req.body;

    console.log("codigo_postal")


    let body = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://www.onlinembe.eu/ws/">
    <soapenv:Header/>
    <soapenv:Body>
       <ws:ShippingOptionsRequest>
          <RequestContainer>
             <System>ES</System>
             <InternalReferenceID>TEST opciones de envio</InternalReferenceID>
             <ShippingParameters>
                 <DestinationInfo>
                     <ZipCode>08901</ZipCode>
                     <City>barcelona</City>
                     <State></State>
                     <Country>ES</Country>
                </DestinationInfo>
                <ShipType>EXPORT</ShipType>
                <PackageType>GENERIC</PackageType>
                <Items>
                   <Item>
                      <Weight>27</Weight>
                      <Dimensions>
                      </Dimensions>
                   </Item>
                   <Item>
                      <Weight>3</Weight>
                      <Dimensions>
                      </Dimensions>
                   </Item>
                </Items>
             </ShippingParameters>
          </RequestContainer>
       </ws:ShippingOptionsRequest>
    </soapenv:Body>
 </soapenv:Envelope>`
    
    fetch('https://api.mbeonline.es/ws', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/xml',
          'Host': '<calculated when request is sent>',
          'Authorization': 'Basic azRGQmp0U0MzUEVUUWxiNnpuQjk6QktRajR2Q0lsV3doUHJ3N3ExOTJSWjQ5QlVlYnpRMGxWM1AxckI4ZQ==',
          'Cookie': '813da5a810cdd3b3e9701f07aacd889a=4d8fc65a1f164a2457f15bde4c0e3b82',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive'
        }
    })
    .then(res => {
      console.log(res)
      res.text()})

    .then(data => {
      console.log(data)
      res.send(data)});
    
  }

    const CalcularEnvio = (req, res) => {

    console.log(JSON.stringify(req.body.precioUPS))


    
    fetch('https://onlinetools.ups.com/ship/v1/rating/Rate', {
        method: 'POST',
        body: JSON.stringify(req.body.precioUPS),
        headers: {
          'AccessLicenseNumber': 'EDC8C33AAB952E52',
          'Password': 'jX$eatZ46pEx95!',
          'Content-Type':'application/json',
          'transid':'Transaction123',
          'transactionSrc':'ES',
          'Username':'KOMO_UPS',
          'Accept':'application/json'

        }
    })
    .then(res => res.text())
    .then(data => res.send(data));
    
  }


  const CrearEnvio = (req, res) => {

    console.log(JSON.stringify(req.body.pedidoUPS))
    fetch('https://onlinetools.ups.com/ship/v1/shipments', {
        method: 'POST',
        body: JSON.stringify(req.body.pedidoUPS),
        headers: {
          'AccessLicenseNumber': 'EDC8C33AAB952E52',
          'Password': 'jX$eatZ46pEx95!',
          'Content-Type':'application/json',
          'transid':'Transaction123',
          'transactionSrc':'ES',
          'Username':'KOMO_UPS',
          'Accept':'application/json'
        }
    })
    .then(res => res.text())
    .then(data => res.send(data));
    
  }

  const GenerarEtiqueta = (req, res) => {

    const { codigo_ups } = req.body;

    console.log(req.body)

    var peticion = {
      "LabelRecoveryRequest": { 
      "LabelSpecification": {
      "HTTPUserAgent": "",
      "LabelImageFormat": {
      "Code": "ZPL"
      },
      "LabelStockSize": {
      "Height": "6",
      "Width": "4"
      } 
      },
      "Translate": {
      "LanguageCode": "spa",
      "DialectCode": "97",
      "Code": "01"
      },
      "LabelDelivery": {
      "LabelLinkIndicator": "",
      "ResendEMailIndicator": "TRUE",
      "EMailMessage": {
      "EMailAddress": ""
      } 
      },
      "TrackingNumber": codigo_ups
      } 
     }

    fetch(' https://onlinetools.ups.com/ship/v1/shipments/labels', {
        method: 'POST',
        body: JSON.stringify(peticion),
        headers: {
          'AccessLicenseNumber': 'EDC8C33AAB952E52',
          'Password': 'jX$eatZ46pEx95!',
          'Content-Type':'application/json',
          'transid':'Transaction123',
          'transactionSrc':'ES',
          'Username':'KOMO_UPS',
          'Accept':'application/json'
        }
    })
    .then(res => res.text())
    .then(data => res.send(data));
    
  }

module.exports = {
 listarAccessPoint,
 CalcularEnvio,
 CalcularEnvioMBE,
 CrearEnvio,
 GenerarEtiqueta
};