async function fetchData() {
	console.log("fetching…")
	const response = await fetch('https://lf-app-chat-widget-backend-production.up.railway.app/widget/storeFront/getWidget', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			"_id": "6511b9a8ac00a5727d719444",
			"chat_widget_id": "6511b9b5ac00a5727d719446",
			"widgetType": "whatsappWidgets"
		})
	});
	return await response.json();
}

function addWidgetStyle(widgetData) {
	console.log("adding styles...")
	const styleTag = document.createElement('style');

	styleTag.textContent = `
	:root{
		--brandColor: ${widgetData.style.brandColor};
		--textColor: ${widgetData.style.textColor};
		--position: ${widgetData.style.textColor};
	}
	`
	document.head.appendChild(styleTag);
}

function createWidget(widgetData) {
	console.log("creating widget…")
	// SECTION
	const section = document.createElement('section');
	section.className = `chat-widget___${widgetData._id}`
	const container = document.createElement('div');
	container.className = "container"
	// BTN
	const btn = document.createElement('div');
	btn.className = 'chat-widget-btn';
	const btnIcon = document.createElement('img');
	btnIcon.src = "https://assets.lightfunnels.com/account-206/images_library/155b7918-cde7-4cb1-92af-914cd62a5d20.icons8-whatsapp%201.svg"
	btn.appendChild(btnIcon)
	// MODAL
	const modal = document.createElement('div');
	modal.className = "chat-modal"
	// MODAL - HEADER
	const header = document.createElement('div');
	header.className = 'header';
	header.insertAdjacentHTML("beforeend", `
			<img class="logo" src="https://assets.lightfunnels.com/account-206/images_library/155b7918-cde7-4cb1-92af-914cd62a5d20.icons8-whatsapp%201.svg" alt="" />
			<div class="content">
				<h4 class="title">${widgetData.content.title}</h4>
				<p class="description">${widgetData.content.description}</p>
			</div>
			`)
	const closeBtn = document.createElement("img")
	closeBtn.className = "chat-close-modal"
	closeBtn.src = "https://assets.lightfunnels.com/account-206/images_library/60e13e8e-8385-4653-85e4-ebd06928c179.24x24.svg"
	header.appendChild(closeBtn)
	// MODAL - CONTENT
	const modalContent = document.createElement('div');
	modalContent.className = "modal-content"
	const responseTime = document.createElement('p');
	responseTime.className = "response-time"
	responseTime.textContent = widgetData.content.responseTimeText
	const agents = document.createElement("div")
	agents.className = "agents"
	widgetData.agents.forEach(agent => {
		const agentEl = document.createElement('a');
		agentEl.href = `https://wa.me/${agent.phone}?text=${widgetData.includeProductUrl ? "%0A" + window.location.href : ""}Hi!%20I'd%20like%20to%20order%20this%20product`;
		agentEl.innerHTML = `
				<div class="agent">
					<img class="avatar" src="https://assets.lightfunnels.com/cdn-cgi/image/width=60,quality=80,format=auto/https://assets.lightfunnels.com/account-206/images_library/d744ecea-2d30-4ac8-89eb-248374cacd53.jpg" alt="" />
					<div>
					<label>${agent.name}</label>
					<p>${agent.label}</p>
					</div>
					<img class="icon" src="" alt="" />
				</div>
				`;

		agents.insertAdjacentElement("beforeend", agentEl);
	});

	modalContent.appendChild(responseTime)
	modalContent.appendChild(agents)

	modal.appendChild(header)
	modal.appendChild(modalContent)

	container.appendChild(modal)
	container.appendChild(btn)

	section.appendChild(container)

	const pageBody = document.querySelector(".vhPBy")
	pageBody.appendChild(section)

	function toggleChatWidget() {
		console.log(modal.style.display)
		if (modal.style.display !== "none")
			modal.style.setProperty("display", "block", "important")
		else
			modal.style.setProperty("display", "none", "important")
	}

	btn.addEventListener("click", toggleChatWidget);
	closeBtn.addEventListener("click", toggleChatWidget);
}

document.addEventListener('DOMContentLoaded', () => {
	fetchData().then(data => {
		addWidgetStyle(data)
		console.log("page is fully loaded");
		createWidget(data)
	}).catch(error => {
		console.error('Error fetching data:', error);
	})
})

// styleTag.textContent = `
// .chat-widget___ {
// 	position: relative;
// 	margin: 0;
// 	padding: 0;
// 	font-family: Inter;
// 	z-index: 1;
// }

// .chat-widget___ .container{
// 	position: fixed;
// 	width: 100%;
// 	bottom: 0px;
// 	left: 0px;
// 	padding: 20px;
// 	z-index: 99999;
// 	display: flex;
// 	flex-direction: column;
// 	height: 100%;
// 	justify-content: flex-end;
// 	align-items: var(--position);
// }

// .chat-widget___ .chat-modal {
// 	width: 100%;
// 	max-width: 380px;
// 	margin-bottom: 20px;
// 	background-color: white;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: stretch;
// 	border-radius: 12px;
// 	box-shadow: rgba(5, 24, 20, 0.13) 0px 4px 20px 0px;
// 	overflow: hidden;
// }

// .chat-widget___ .chat-modal .header {
// 	position: relative;
// 	padding: 24px;
// 	display: flex;
// 	flex-direction: row;
// 	align-items: center;
// 	background-color: var(--brandColor);

// }

// .chat-widget___ .chat-modal .header .logo {
// 	width: 40px;
// 	height: 40px;
// 	margin-right: 24px;
// }

// .chat-widget___ .chat-modal .header .content {
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: stretch;
// 	gap: 8px;
// }

// .chat-widget___ .chat-modal .header .content .title {
// 	font-size: 18px;
// 	line-height: 130%;
// 	font-weight: 500;
// 	color: var(--textColor);

// }

// .chat-widget___ .chat-modal .header .content .description {
// 	font-size: 14px;
// 	line-height: 150%;
// 	font-weight: 400;
// 	color: var(--textColor);
// 	opacity: 70%;
// }

// .chat-widget___ .chat-modal .header .chat-close-modal {
// 	width: 24px;
// 	height: 24px;
// 	position: absolute;
// 	top: 16px;
// 	right: 16px;
// 	opacity: 50%;
// }

// .chat-widget___ .chat-modal .header .chat-close-modal:hover {
// 	opacity: 100%;
// }

// .chat-widget___ .chat-modal .modal-content{
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: stretch;
// 	padding: 24px;
// }

// .chat-widget___ .chat-modal .modal-content .response-time {
// 	font-size: 14px;
// 	line-height: 150%;
// 	font-weight: 400;
// 	color: #051814;
// 	margin-bottom: 20px;
// 	opacity: 70%;
// }

// .chat-widget___ .chat-modal .modal-content .agents {
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: stretch;
// 	gap: 16px;
// }

// .chat-widget___ .chat-modal .modal-content .agents .agent {
// 	width: 100%;
// 	padding: 16px;
// 	background-color: #f1f5f8;
// 	display: flex;
// 	flex-direction: row;
// 	align-items: center;
// 	border-style: solid;
// 	border-width: 0px 0px 0px 4px;
// 	border-color: var(--brandColor);
// 	border-radius: 8px;
// }
// .chat-widget___ .chat-modal .modal-content .agents a{
// 	text-decoration: none;
// }

// .chat-widget___ .chat-modal .modal-content .agents .agent .avatar {
// 	width: 48px;
// 	height: 48px;
// 	margin-right: 16px;
// 	border-radius: 50%;
// 	object-fit: cover;
// }
// .chat-widget___ .chat-modal .modal-content .agents .agent > div{
// 	width: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	gap: 4px;
// }

// .chat-widget___ .chat-modal .modal-content .agents .agent > div * {
// 	font-size: 14px;
// 	line-height: 18px;
// }

// .chat-widget___ .chat-modal .modal-content .agents .agent > div label {
// 	font-weight: 600;
// 	color: #051814;

// }

// .chat-widget___ .chat-modal .modal-content .agents .agent>div p {
// 	color: #475851;
// }

// .chat-widget___ .chat-modal .modal-content .agents .agent >div img {
// 	width: 24px;
// 	height: 24px;
// }

// .chat-widget___ .chat-widget-btn {
// 	background-color: var(--brandColor);
// 	width: fit-content;
// 	height: fit-content;
// 	min-width: 64px;
// 	min-height: 64px;
// 	border-radius: 100%;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// }
// `;