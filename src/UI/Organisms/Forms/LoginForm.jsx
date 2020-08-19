import React from 'react'
import { Input, Button, Form } from 'antd'
import style from './style.module.scss'

export const LoginForm = ({ onFinish, invalidCredentials }) => {
  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="mb-5 px-3">
          <strong>Welcome to CryptoPlatform</strong>
        </h1>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-3">
          <strong>Sign in to your account</strong>
        </div>
        <Form layout="vertical" hideRequiredMark onFinish={onFinish} className="mb-4">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your login' }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input size="large" type="password" placeholder="Password" />
          </Form.Item>
          {invalidCredentials && <span style={{ color: 'red' }}>Password or Email is wrong!</span>}
          <Button type="primary" size="large" className="text-center w-100" htmlType="submit">
            <strong>Sign in</strong>
          </Button>
        </Form>
        <span className="kit__utils__link font-size-16">Forgot Password?</span>
      </div>
    </div>
  )
}
