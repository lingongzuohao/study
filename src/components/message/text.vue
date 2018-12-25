<template>
    <div>
        <div v-if="message.from === 'master'" :class="['message-item-line', message.from]">
            <img class="head-sculpture" :src="message.body.icon" alt="">
            <div class="message-body">
                <p class="message-time">{{getDateString(message.body.date)}}</p>
                <div class="message-content">{{message.body.content}}</div>
            </div>
        </div>
        <div v-else :class="['message-item-line', message.from]">
            <div class="message-body">
                <p class="message-time">{{getDateString(message.body.date)}}</p>
                <div class="message-content">{{message.body.content}}</div>
            </div>
            <img class="head-sculpture" :src="message.body.icon" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: Object,
                required: true
            }
        },
        data() {
            return {

            }
        },
        methods: {
            getDateString(timestamp) {
                let D = new Date()

                let y = D.getFullYear(),
                    m = D.getMonth() + 1,
                    d = D.getDate(),
                    h = D.getHours(),
                    min = D.getMinutes(),
                    s = D.getSeconds()

                return `${y}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d} ${h > 9 ? h : '0' + h}:${min > 9 ? min : '0' + min}:${s > 9 ? s : '0' + s}`
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .message-item-line 
        display flex
        align-items center
        margin-bottom 20px

        .head-sculpture 
            align-self flex-start
            width 40px
            height 40px

        &.master
            justify-content flex-start
            text-align left

            .head-sculpture 
                margin-right 10px

            .message-body 
                align-items flex-start

                div 
                    background-color #5d3c3a

        &.self
            justify-content flex-end
            text-align right

            .head-sculpture 
                margin-left 10px

            .message-body 
                align-items flex-end

                div 
                    background-color rgb(54, 153, 255)

        .message-body
            max-width 400px
            height auto 
            text-align left
            display flex
            flex-direction column
            justify-content center
            color #ffffff

            p 
                text-align left
                color #2c3e50

            div 
                display inline-block
                max-width 100%
                border-radius 4px
                height auto 
                line-height 1.6
                padding 4px 10px  
                margin-top 10px
</style>
