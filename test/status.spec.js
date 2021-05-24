const status = require('../helpers/status')
const {HttpCode, Subscription} = require('../helpers/constants')
const {User} = require('../model/__mocks__/data')

describe('Unit test: helper/status', () => {
  const req = { user: User}
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((response) => response)
  }
  const next = jest.fn()
  
  test('run function with right status', ()=>{
    status(Subscription.PRO)(req, res, next)
    expect(next).toHaveBeenCalled()
  })
  test('run function with wrong status', ()=>{
    const result = status(Subscription.BUSINESS)(req, res, next)
    expect(result.status).toEqual('error')
    expect(result.code).toEqual(HttpCode.FORBIDEN)
    expect(result.message).toEqual('Access is denied')
  })
})
