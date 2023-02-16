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
    <SearchRadius>50</SearchRadius>
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

module.exports = {
 listarAccessPoint,
 CalcularEnvio
};