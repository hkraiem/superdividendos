import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PortfolioItem from './PortfolioItem'

jest.mock('./Search', () => ({ anchorEl, onChange }) =>
  anchorEl ? (
    <button onClick={() => onChange({ ticker: 'EGIE3', name: 'ENGIE' })}>
      Click me
    </button>
  ) : null
)

describe('<PortfolioItem />', () => {
  it('focus on the quantity input when a ticker is selected', async () => {
    const { getByText, getByTitle } = render(
      <PortfolioItem
        onChange={jest.fn()}
        onDelete={jest.fn()}
        item={{
          asset: { ticker: 'ABEV3', name: 'AMBEV' },
          quantity: 100,
        }}
      />
    )
    fireEvent.click(getByText('ABEV3'))
    const button = getByText('Click me')
    const input = getByTitle('Quantidade')
    expect(document.activeElement).not.toBe(input)
    fireEvent.click(button)
    expect(document.activeElement).toBe(input)
  })

  // it('calls onChange when the quantity is changed', () => {
  //   const onChange = jest.fn()
  //   const { queryByTitle } = render(
  //     <PortfolioItem
  //       onChange={onChange}
  //       onDelete={jest.fn()}
  //       item={{
  //         asset: { ticker: 'ABEV3', name: 'AMBEV' },
  //         quantity: 0,
  //       }}
  //     />
  //   )
  //   expect(onChange).not.toBeCalled()
  //   fireEvent.click(queryByTitle('Aumentar'))
  //   expect(onChange).toBeCalledWith({
  //     asset: { ticker: 'ABEV3', name: 'AMBEV' },
  //     quantity: 100,
  //   })
  // })

  // it('calls onDelete when the delete button is clicked', () => {
  //   const onDelete = jest.fn()
  //   const { queryByLabelText } = render(
  //     <PortfolioItem
  //       onChange={jest.fn()}
  //       onDelete={onDelete}
  //       item={{
  //         asset: { ticker: 'ABEV3', name: 'AMBEV' },
  //         quantity: 0,
  //       }}
  //     />
  //   )
  //   expect(onDelete).not.toBeCalled()
  //   fireEvent.click(queryByLabelText('Remover'))
  //   expect(onDelete).toBeCalledWith({
  //     asset: { ticker: 'ABEV3', name: 'AMBEV' },
  //     quantity: 0,
  //   })
  // })
})
