import { useState, useEffect } from 'react'

interface IScrollbarState {
	directionX: ('left' | 'right' | null)
	directionY: ('up' | 'down' | null)
	scrollX: number
	scrollY: number
}

interface IConfig {
	delay: number
}

type TParams = IConfig | null

/**
 * scrollbar hook
 */
export function scrollbar(config: TParams = null) {

	const [data, setData] = useState<IScrollbarState>({
		directionX: null,
		directionY: null,
		scrollY: 0,
		scrollX: 0
	})

	const isSSR: boolean = typeof window === 'undefined'
	let timer: any = null

	// cache last horizontal and vertical scroll positions
	let lastScrollX = isSSR ? 0 : window.scrollX
	let lastScrollY = isSSR ? 0 : window.scrollY

	const handler = () => {
		const newScrollY = window.scrollY
		const newScrollX = window.scrollX
		// check if new horizontal position is greater than cached position
		if (newScrollX > lastScrollX) {
			setData({
				...data,
				directionX: 'right',
				scrollX: newScrollX
			})
		} else if(newScrollX < lastScrollX) {
			setData({
				...data,
				directionX: 'left',
				scrollX: newScrollX
			})
		}

		// check if new vertical position is greater than cached position
		if (newScrollY > lastScrollY) {
			setData({
				...data,
				directionY: 'down',
			 scrollY: newScrollY
			})
		} else if (newScrollY < lastScrollY) {
			setData({
				...data,
				directionY: 'up',
			 	scrollY: newScrollY
			})
		}

		lastScrollX = newScrollX
		lastScrollY = newScrollY
	}

	const debouncedHanlder = () => {
		let _delay: number = 150
		if (config !== null && typeof config === 'object') {
			_delay = config.delay || _delay
		}
		clearTimeout(timer)
		timer = setTimeout(handler, _delay)
	}

	useEffect(() => {
		if (!isSSR) {
			window.addEventListener('scroll', debouncedHanlder)
				return () => {
					window.removeEventListener('scroll', debouncedHanlder)
				}
		}
		return undefined
	}, [])
	return data
}
