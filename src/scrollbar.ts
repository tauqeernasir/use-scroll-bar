import { useState, useEffect } from 'react'

interface IScrollbarState {
	directionX: ('left' | 'right' | null)
	directionY: ('up' | 'down' | null)
	scrollX: number
	scrollY: number
}

export function scrollbar() {

	const [data, setData] = useState<IScrollbarState>({
		directionX: null,
		directionY: null,
		scrollY: 0,
		scrollX: 0
	})

	let lastScrollX = window.scrollX
	let lastScrollY = window.scrollY

	const handler = () => {
		console.log('hanlder function')
		const newScrollY = window.scrollY
		const newScrollX = window.scrollX
		if (newScrollX > lastScrollX) {
			setData({
				...data,
				directionX: 'right',
				scrollX: newScrollX
			})
		} else {
			setData({
				...data,
				directionX: 'left',
				scrollX: newScrollX
			})
		}

		if (newScrollY > lastScrollY) {
			setData({
				...data,
				directionY: 'down',
			 scrollY: newScrollY
			})
		} else {
			setData({
				...data,
				directionY: 'up',
			 	scrollY: newScrollY
			})
		}

		lastScrollX = newScrollX
		lastScrollY = newScrollY
	}

	useEffect(() => {
		window.addEventListener('scroll', handler)

		return () => {
			window.removeEventListener('scroll', handler)
		}
	}, [])

	return data
}
