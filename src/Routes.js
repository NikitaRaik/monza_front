import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Assortment as AssortmentView,
  AssortmentCreate as AssortmentCreateView,
  AssortmentEdit as AssortmentEditView,
  AssortmentGroup as AssortmentGroupView,
  AssortmentGroupCreate as AssortmentGroupCreateView,
  AssortmentGroupEdit as AssortmentGroupEditView,
  Warehouse as WarehouseView,
  WarehouseCreate as WarehouseCreateView,
  WarehouseEdit as WarehouseEditView,
  WarehouseGroup as WarehouseGroupView,
  WarehouseGroupCreate as WarehouseGroupCreateView,
  WarehouseGroupEdit as WarehouseGroupEditView,
  Contractor as ContractorView,
  ContractorCreate as ContractorCreateView,
  ContractorEdit as ContractorEditView,
  MeasureUnit as MeasureUnitView,
  MeasureUnitCreate as MeasureUnitCreateView,
  MeasureUnitEdit as MeasureUnitEditView,
  WarehouseOperation as WarehouseOperationView,
  WarehouseOperationCreate as WarehouseOperationCreateView,
  WarehouseOperationEdit as WarehouseOperationEditView,
  WarehouseOperationGenerateGraph as WarehouseOperationGenerateGraphView,
  AnalizeXyz as AnalizeXyzView,
  AnalizeXyzCreate as AnalizeXyzCreateView,
  AnalizeXyzResult as AnalizeXyzResultView,
  Profile as ProfileView,
  SignIn as SignInView,
  Forgot as ForgotView,
  ResetPassword as ResetPasswordView,
  SignUp as SignUpView,
  ValidateUser as ValidateUserView,
  NotFound as NotFoundView,
} from './views';

const Routes = (props) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <RouteWithLayout
        component={AssortmentView}
        exact
        layout={MainLayout}
        title='Lista Asortymentów'
        path="/assortment"
      />
      <RouteWithLayout
        component={AssortmentCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Asortymentu'
        path="/assortment/create"
      />
      <RouteWithLayout
        component={AssortmentEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Asortymentu'
        path="/assortment/edit/:id"
      />
      <RouteWithLayout
        component={AssortmentGroupView}
        exact
        layout={MainLayout}
        title='Lista Grup Asortymentowych'
        path="/group_assortment"
      />
      <RouteWithLayout
        component={AssortmentGroupCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Grupy Asortymentów'
        path="/group_assortment/create"
      />
      <RouteWithLayout
        component={AssortmentGroupEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Grupy Asortymentów'
        path="/group_assortment/edit/:id"
      />
      <RouteWithLayout
        component={WarehouseView}
        exact
        layout={MainLayout}
        title='Lista Magazynów'
        path="/warehouse"
      />
      <RouteWithLayout
        component={WarehouseCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja magazynu'
        path="/warehouse/create"
      />
      <RouteWithLayout
        component={WarehouseEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja magazynu'
        path="/warehouse/edit/:id"
      />
      <RouteWithLayout
        component={WarehouseGroupView}
        exact
        layout={MainLayout}
        title='Lista Grup Magazynów'
        path="/warehouse_group"
      />
      <RouteWithLayout
        component={WarehouseGroupCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Grupy Magazynów'
        path="/warehouse_group/create"
      />
      <RouteWithLayout
        component={WarehouseGroupEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Grupy Magazynów'
        path="/warehouse_group/edit/:id"
      />
      <RouteWithLayout
        component={ContractorView}
        exact
        layout={MainLayout}
        title='Lista Kontrahentów'
        path="/contractor"
      />
      <RouteWithLayout
        component={ContractorCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Kontrahenta'
        path="/contractor/create"
      />
      <RouteWithLayout
        component={ContractorEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Kontrahenta'
        path="/contractor/edit/:id"
      />
      <RouteWithLayout
        component={MeasureUnitView}
        exact
        layout={MainLayout}
        title='Lista Jednostek Miary'
        path="/measure_unit"
      />
      <RouteWithLayout
        component={MeasureUnitCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Jednostki Miary'
        path="/measure_unit/create"
      />
      <RouteWithLayout
        component={MeasureUnitEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja Jednostki Miary'
        path="/measure_unit/edit/:id"
      />
      <RouteWithLayout
        component={WarehouseOperationView}
        exact
        layout={MainLayout}
        title='Lista Operacji Magazynowych'
        path="/warehouse_operation"
      />
      <RouteWithLayout
        component={WarehouseOperationCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja operacji magazynowej'
        path="/warehouse_operation/create"
      />
      <RouteWithLayout
        component={WarehouseOperationEditView}
        exact
        layout={MainLayout}
        title='Dodawanie/Edycja operacji magazynowej'
        path="/warehouse_operation/edit/:id"
      />
      <RouteWithLayout
        component={WarehouseOperationGenerateGraphView}
        exact
        layout={MainLayout}
        title='Generuj wykres'
        path="/warehouse_operation/generate"
      />
      <RouteWithLayout
        component={AnalizeXyzView}
        exact
        layout={MainLayout}
        title='Lista analiz ABC i XYZ'
        path="/analyze_xyz"
      />
      <RouteWithLayout
        component={AnalizeXyzCreateView}
        exact
        layout={MainLayout}
        title='Dodawanie analizy ABC i XYZ'
        path="/analyze_xyz/create"
      />
      <RouteWithLayout
        component={AnalizeXyzResultView}
        exact
        layout={MainLayout}
        title='Wyniki analizy'
        path="/analyze_xyz/result"
      />
      <RouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        title='Twój profil'
        path="/profile"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        title='Zaloguj się'
        path="/login"
      />
      <RouteWithLayout
        component={ForgotView}
        exact
        layout={MinimalLayout}
        title='Odzyskaj hasło'
        path="/forgotpassword"
      />
      <RouteWithLayout
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
        title='Zresetuj hasło'
        path="/reset_password"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        title='Zresetuj się'
        layout={MinimalLayout}
        path="/register"
      />
      <RouteWithLayout
        component={ValidateUserView}
        exact
        layout={MinimalLayout}
        path="/verification"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        title='Nie znaleziono'
        path="/not-found"
      />

      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
