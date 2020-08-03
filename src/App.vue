<template>
    <div id="app">
        <draggable
            v-model="scenes"
            @start="drag = true"
            @end="drag = false"
            @change="moveScene"
            v-bind="dragOptions"
        >
            <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
                class="scene-list"
            >
                <li
                    v-for="scene in scenes"
                    :key="scene._uid"
                    class="scene-list__item"
                >
                    {{ scene._name }}
                </li>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import xjs from "xjs-framework/dist/xjs-es2015";

export default {
    name: "App",
    components: {
        draggable
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    data() {
        return {
            scenes: []
        };
    },
    methods: {
        async getSceneList() {
            let sceneList = [];
            const sceneCount = await xjs.Scene.getSceneCount();
            for (let i = 0; i < sceneCount; i++) {
                sceneList.push(await xjs.Scene.getBySceneIndex(i));
            }
            return (this.scenes = sceneList);
        },
        async moveScene(data) {
            await xjs.exec(
                "AppCallFuncAsync",
                "shiftpresets",
                `${data.moved.oldIndex},${data.moved.newIndex}}`
            );
        },
        test(data) {
            console.log(data);
        }
    },
    async mounted() {
        await xjs.ready();
        await this.getSceneList();
    }
};
</script>

<style lang="scss">
body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    // margin-top: 60px;
}
.scene-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 5px;
    &__item {
        cursor: pointer;
        font-size: 12px;
        width: 100px;
        background-color: rgb(238, 238, 238);
        border-radius: 3px;
        padding: 10px;
        // display: inline-block;
    }
}

.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>
