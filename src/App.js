/* eslint-disable react/no-children-prop */
import React, { Suspense, useEffect } from 'react'
import { Route, Router as ReactRouter, Redirect, Switch } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { SettingsSelectors } from 'Lib/Store/settings'
import { Layout } from './UI/Templates/AppTemplate'
import './UI/global-animation.sass'
import { routes, modalRoutes } from './router'

export const Router = ({ history }) => {
  const { routerAnimation } = useSelector(SettingsSelectors.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'GET_ALL_RATES' })
    const interval = setInterval(() => {
      dispatch({ type: 'GET_ALL_RATES' })
    }, 15000)
    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => {
    const expiration = localStorage.getItem('expiration')
    if (expiration) {
      const expirationUnix = moment(expiration, 'YYYY.MM.DD, h:mm:ss').unix()
      const nowTime = new Date().toLocaleString()
      const nowTimeUnix = moment(nowTime, 'YYYY.MM.DD, h:mm:ss').unix()
      if (expirationUnix <= nowTimeUnix) {
        dispatch({ type: 'LOGOUT' })
      }
    }
  }, [dispatch])
  return (
    <ReactRouter history={history}>
      <Layout>
        <Route
          render={state => {
            return (
              <Switch location={state.location}>
                <Route exact path="/" render={() => <Redirect to="/vouchers" />} />
                {routes.map(({ path, Component, exact }) => (
                  <Route
                    path={path}
                    key={path}
                    exact={exact}
                    render={() => {
                      return (
                        <div className={routerAnimation}>
                          <Suspense fallback={null}>
                            <Component />
                          </Suspense>
                        </div>
                      )
                    }}
                  />
                ))}
                <Redirect to="/auth/404" />
              </Switch>
            )
          }}
        />
        <Route
          render={state => {
            const { location } = state
            return (
              <SwitchTransition>
                <CSSTransition key={location.pathname} appear classNames="my-node" timeout={300}>
                  <Switch location={location}>
                    {modalRoutes.map(({ path, Component, exact }) => (
                      <Route
                        key={path}
                        path={path}
                        exact={exact}
                        render={() => {
                          return (
                            <Suspense fallback={null}>
                              <Component />
                            </Suspense>
                          )
                        }}
                      />
                    ))}
                  </Switch>
                </CSSTransition>
              </SwitchTransition>
            )
          }}
        />
      </Layout>
    </ReactRouter>
  )
}
