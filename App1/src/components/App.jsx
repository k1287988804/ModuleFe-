import React from 'react'
const { Fragment } = require("react");
const Com = React.lazy(() => import('app2/Com'))

const App = () => (<Fragment>
	<h2>App1 is Here</h2>
	{/* 引入App2的组件 */}
	<React.Suspense fallback="Loading Com..">
		<Com />
	</React.Suspense>
</Fragment>)

export default App