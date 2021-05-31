const assortment_header = [
  {
    header: 'Indeks',
    attr: 'index',
  }, {
    header: 'GTIN',
    attr: 'gtin' 
  }, {
    header: 'Nazwa',
    attr: 'name' 
  }, {
    header: 'Jednostka logistyczna',
    attr: 'measure_unit_name' 
  }, {
    header: 'Jednostka handlowa',
    attr: 'unit_name' 
  }, {
    header: 'Cena zakupu [PLN]',
    attr: 'purchase_price' ,
    type: 'number',
  }, {
    header: 'Cena sprzedaży [PLN]',
    attr: 'sale_price' ,
    type: 'number',
  }, {
    header: 'Grupa asortymentowa',
    attr: 'assortment_group_name' 
  }, {
    header: 'Typ asortymentu',
    attr: 'assortment_type' 
  }, {
    header: 'Prawdopodobieństwo \nObsługi popytu [%]',
    attr: 'service_demand' ,
    type: 'number',
  }, {
    header: 'Czas cyklu \nUzupełniania [dnia]',
    attr: 'refill_cycle_time' ,
    type: 'number',
  }, {
    header: 'Odchylenia czasu \nCyklu uzupełnienia [dni]',
    attr: 'cycle_time_deviations' ,
    type: 'number',
  }, {
    header: 'Współczynnik kosztu \nUtrzymania zapasu [-]',
    attr: 'inventory_cost_factor' ,
    type: 'number',
  }, {
    header: 'Aktywny',
    attr: 'active',
    type: 'bool', 
  }, {
    header: 'Na zamówienie',
    attr: 'to_order' ,
    type: 'bool',
  },
];

const assortment_group_header = [
  {
    header: 'Nazwa grupy',
    attr: 'name' 
  }, {
    header: 'Grupa główna',
    attr: 'is_main_group' ,
    type: 'bool'
  }, {
    header: 'Nazwa grupy głównej',
    attr: 'main_group_name' 
  }, {
    header: 'Kod',
    attr: 'code' 
  }, {
    header: 'Opis',
    attr: 'description' 
  }, {
    header: 'Prawdopodobieństwo obsługi popytu [%]',
    attr: 'service_demand' ,
    type: 'number'
  }, {
    header: 'Czas cyklu uzupełniania [dni]',
    attr: 'refill_cycle_time' ,
    type: 'number'
  }, {
    header: 'Odchylenie czasu cyklu uzupełnienia [dni]',
    attr: 'cycle_time_deviations' ,
    type: 'number'
  }, {
    header: 'Współczynnik kosztu Utrzymania zapasu [-]',
    attr: 'inventory_cost_factor' ,
    type: 'number'
  }
];

const warehouse_header = [
  {
    header: 'Nazwa magazynu',
    attr: 'name' 
  }, {
    header: 'Opis',
    attr: 'description' 
  }, {
    header: 'Aktywny',
    attr: 'active' ,
    type: 'bool'
  }
];

const warehouse_group_header = [
  {
    header: 'Nazwa grupy',
    attr: 'name' 
  }, {
    header: 'Przynależne magazyny',
    attr: 'warehouses' 
  }, {
    header: 'Aktywny',
    attr: 'active' ,
    type: 'bool'
  }, {
    header: 'Opis',
    attr: 'description' 
  }, {
    header: 'Przyjęcia',
    attr: 'received' ,
    type: 'number'
  }, {
    header: 'Wydania',
    attr: 'releases' ,
    type: 'number'
  }, {
    header: 'Zapas',
    attr: 'supply' ,
    type: 'number'
  }
];

const contractor_header = [
  {
    header: 'Kod',
    attr: 'code' 
  }, {
    header: 'Nazwa',
    attr: 'name' 
  }, {
    header: 'GLN',
    attr: 'GLN' 
  }, {
    header: 'Ulica',
    attr: 'address' 
  }, {
    header: 'Kod pocztowy',
    attr: 'postal_code' 
  }, {
    header: 'Miasto',
    attr: 'city' 
  }, {
    header: 'Opis',
    attr: 'description' 
  }, {
    header: 'Czas realizacji Zamówienia [dni]',
    attr: 'order_fulfillment_time',
    type: 'number'
  }, {
    header: 'Odchylenie czasu Realizacji [dni]',
    attr: 'delivery_time_deviation' ,
    type: 'number'
  }, {
    header: 'Minimalna wielkość Zamówienia',
    attr: 'minimum_order_quantity' ,
    type: 'number'
  }, {
    header: 'Minimalna wartość zamówienia [PLN]',
    attr: 'minimum_order_value' ,
    type: 'number'
  }, {
    header: 'Dostawca',
    attr: 'supplier' ,
    type: 'bool'
  }, {
    header: 'Odbiorca',
    attr: 'recipient' ,
    type: 'bool'
  }, {
    header: 'Aktywny',
    attr: 'active',
    type: 'bool' 
  }, {
    header: 'Dostawca pokrywa Koszty transportu',
    attr: 'supplier_transport' ,
    type: 'bool'
  }
];

const measure_unit_header = [
  {
    header: 'Nazwa',
    attr: 'name'
  }, {
    header: 'Opis',
    attr: 'description'
  }
];

const warehouse_operation_header = [
  {
    header: 'Nazwa asortymentu',
    attr: 'assortment_name'
  }, {
    header: 'Grupa',
    attr: 'assortment_group_name'
  }, {
    header: 'Data',
    attr: 'date'
  }, {
    header: 'Jednostka Miary',
    attr: 'unit_name'
  }, {
    header: 'Jednostka Logistyczna',
    attr: 'measure_unit_name',
  }, {
    header: 'Magazyn',
    attr: 'warehouse_name'
  }, {
    header: 'Kontrahent',
    attr: 'contractor_name'
  }, {
    header: 'Wielkość przyjęć',
    attr: 'receipt_value',
    type: 'number'
  }, {
    header: 'Częstotliwość przyjęć [-]',
    attr: 'reception_frequency',
    type: 'number'
  }, {
    header: 'Wartość przyjęć [PLN]',
    attr: 'calculated_received_value',
    type: 'calculate',
    first: 'receipt_value',
    second: 'purchase_price'
  }, {
    header: 'Wielkość wydań',
    attr: 'issue_amount',
    type: 'number'
  }, {
    header: 'Częstotliwość wydań [-]',
    attr: 'release_frequency',
    type: 'number'
  }, {
    header: 'Wartość wydań [PLN]',
    attr: 'calculated_releases_value',
    type: 'calculate',
    first: 'issue_amount',
    second: 'sale_price'
  }, {
    header: 'Zapas [jednostka miary]',
    attr: 'inventory',
    type: 'number'
  }, {
    header: 'Wartość zapasu [PLN]',
    attr: 'stock_value',
    type: 'calculate',
    first: 'inventory',
    second: 'purchase_price'
  }, {
    header: 'Wielkość zamówienia [jednostka miary]',
    attr: 'order_quantity',
    type: 'number',
  }, {
    header: 'Wartość Zamówienia [PLN]',
    attr: 'order_value',
    type: 'calculate',
    first: 'order_quantity',
    second: 'sale_price'
  }
];

export {
  assortment_header,
  assortment_group_header,
  warehouse_header,
  warehouse_group_header,
  contractor_header,
  measure_unit_header,
  warehouse_operation_header
}