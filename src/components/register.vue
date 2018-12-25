<template>
    <div class="register-wrap">
        <transition name="slide-in">
			<div v-if="registerContainerShow" :class="['register-container', registerType === 'bindPhone' ? 'bind-phone' : '']">
				<img 
					class="register-close" 
					src="../assets/images/close-icon.png" 
					@click="closeRegisterWrapHandler" 
					alt=""
				/>
				<transition name="slide-in">
					<div v-if="registerType === 'bindPhone'" class="phone-binding-module">
						<div class="register-desc-line">
							<img src="../assets/images/login-head-line-icon.jpg" alt="">
							<div>
								<h3>绑定手机</h3>
								<p>
									<img src="../assets/images/login-head-warning-icon.jpg" alt="">
									<span>根据法律相关规定，用户需绑定真实手机号进行相关验证</span>
								</p>
							</div>
						</div>
						<div class="register-input-wrap">
							<el-form
								label-position="left"
								label-width="70px"
							>
								<el-form-item
									label="手机号:"
								>
									<el-input v-model="registerObj.tel" placeholder="请输入手机号"></el-input>
								</el-form-item>
								<el-form-item
									label="验证码:"
								>
									<div class="register-form-code-line">
										<el-input class="code-line-input" v-model="registerObj.code" placeholder="请输入验证码"></el-input>
										<el-button 
											class="code-line-button" 
											:disabled="isSendingCode"
											@click="sendCodeHandler"
										>{{isSendingCode ? countDown + ' S' : '点击发送'}}</el-button>
									</div>
								</el-form-item>
								<el-form-item
									label="支付码:"
								>
									<el-input v-model="registerObj.sn" placeholder="支付码（选填）"></el-input>
								</el-form-item>
								<div class="register-form-tool-wrap">
									<el-button 
										class="register-form-submit" 
										type="primary" 
										:disabled="submitInfoBtnDisabled"
										@click="register"
									>提交</el-button>
								</div>
							</el-form>
						</div>
					</div>
					<div v-if="registerType === 'thirdPart'" class="third-part-register-container">
						<h3>注册</h3>
						<div class="third-part-list">
							<div @click="loginThirdPart('QQ')">
								<img src="../assets/images/qq.png" alt="">
								<span>QQ登陆</span>
							</div>
							<div @click="loginThirdPart('WeChat')">
								<img src="../assets/images/wechat.png" alt="">
								<span>微信登陆</span>
							</div>
						</div>
						<div class="agreement-container">
							<el-checkbox v-model="agreement"></el-checkbox>
							<p>
								<span>我已阅读并接受</span>
								<a href="javascript:;">《注册声明》、《版权声明》</a>
							</p>
						</div>
						<div class="go-login-container">
							<p>
							    <a href="javascript:;" @click="phoneCodeAdd">短信注册</a>
						    </p>
							<p>
								<span>已有账号？</span>
								<a href="javascript:;" @click="go2Login">去登陆</a>
							</p>
						</div>
					</div>
				</transition>
			</div>
		</transition>
    </div>
</template>

<script>
const COUNT_DOWN_SECOND = 60;

export default {
  data() {
    return {
      registerObj: {
        tel: "",
        code: "",
        sn: ""
      },
      registerContainerShow: false,
      countDown: COUNT_DOWN_SECOND,
      isSendingCode: false,
      agreement: true,
			// registerType: "thirdPart"
			registerType: 'bindPhone'
    };
  },
  computed: {
    submitInfoBtnDisabled() {
      return !this.isPhone() || !this.registerObj.code;
    }
  },
  mounted() {
    this.registerContainerShow = true;
  },
  methods: {
    register() {
      // TODO register
      if (this.registerObj.code === "") {
        this.$message.error("请输入验证码");

        return;
      }
      this.$http
        .post(this.Api.POST_ADD, this.$qs.stringify(this.registerObj))
        .then(resp => {
          // 用户信息保存进store
          this.$store.commit('setUserLoginStatus', {
          	login: true,
          	user: resp.data
          })
          // 关闭登陆dialog
          this.$store.commit("setLoginWrapState", false);
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendCode() {
      this.countDownHandler();
    },
    closeRegisterWrapHandler() {
      this.$store.commit("setRegisterWrapState", false);
    },
    isPhone() {
      return /(13|15|17|18|14|16)[0-9]{9}/.test(this.registerObj.tel);
    },
    sendCodeHandler() {
      if (!this.isPhone()) {
        this.$message.error("请输入正确的手机号");

        return;
      }
      this.$http
        .post(
          this.Api.POST_SEND,
          this.$qs.stringify({
            tel: this.registerObj.tel
          })
        )
        .then(resp => {
					if(resp.status === 200) {
						this.$message.success('发送成功')
					}
        })
        .catch(error => {
          console.log(error);
        });
      this.sendCode();
    },
    countDownHandler() {
      let timer = null;
      this.isSendingCode = true;
      this.countDown = COUNT_DOWN_SECOND;

      timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(timer);
          this.isSendingCode = false;
        }
      }, 1000);
    },
    loginThirdPart(type) {
      if (!this.agreement) {
        this.$message.error("请阅读并接受登陆声明");
        return;
      }

      this.registerType = "bindPhone";
    },
    phoneCodeAdd() {
      this.registerType = "bindPhone";
      // this.$store.commit('setLoginWrapState', false)
      // this.$store.commit('setRegisterWrapState', true)
    },
    go2Login() {
      this.$store.commit("setRegisterWrapState", false);
      this.$store.commit("setLoginWrapState", true);
    }
  }
};
</script>

<style lang="stylus" scoped>
@keyframes translate-in {
	0% {
		transform: translateY(-3000px);
	}

	60% {
		transform: translateY(25px);
	}

	75% {
		transform: translateY(-10px);
	}

	90% {
		transform: translateY(5px);
	}

	100% {
		transform: translateY(0);
	}
}

.slide-in-enter-active, .slide-in-leave-active {
	animation: translate-in 1s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.register-wrap {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #919191;
	z-index: 99;

	.register-container {
		width: 500px;
		height: 340px;
		background-color: #ffffff;
		border-radius: 8px;
		padding: 30px 20px;
		position: relative;
		transition: all 0.4s ease;

		&.bind-phone {
			height: 420px;
		}

		.register-close {
			width: 14px;
			height: 14px;
			position: absolute;
			top: 30px;
			right: 20px;
			cursor: pointer;
			z-index: 10;
		}

		.phone-binding-module {
			width: 100%;

			.register-desc-line {
				height: 80px;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1px solid #ccc;

				img {
					width: 24px;
					height: auto;
					flex-grow: 0;
					margin: 0 20px;
				}

				div {
					text-align: left;

					h3 {
						font-size: 16px;
						color: #2b2b2b;
					}

					p {
						font-size: 12px;
						display: flex;
						align-items: center;

						span {
							color: #ff3a00;
						}

						img {
							width: 14px;
							height: 14px;
							margin-right: 4px;
							margin-left: 0;
						}
					}
				}
			}

			.register-input-wrap {
				width: 340px;
				margin: auto;
				margin-top: 40px;

				.register-form-code-line {
					display: flex;
					justify-content: center;
					align-items: center;

					.code-line-button {
						margin-left: 10px;
						color: #fff;
						background-color: #0060cd;
					}
				}
			}

			.register-form-tool-wrap {
				text-align: center;
			}

			.register-form-submit {
				width: 220px;
				margin-top: 10px;
			}
		}

		.third-part-register-container {
			width: 100%;
			position: relative;

			h3 {
				text-align: center;
				color: #2b2b2b;
			}

			.third-part-list {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 30px 0;

				div {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					width: 100px;
					cursor: pointer;

					img {
						width: 100px;
						height: auto;
					}

					span {
						font-size: 14px;
						margin-top: 10px;
					}
				}
			}

			.agreement-container {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;

				p {
					margin-left: 10px;

					a {
						text-decoration: underline;
					}
				}
			}

			.go-login-container {
				text-align: center;
				font-size: 14px;
				margin-top: 20px;

				a {
					color: #008aff;
				}
			}
		}
	}
}
</style>
