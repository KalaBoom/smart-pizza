<template>
    <div>
        {{product.type}}
        {{product.title}}
        {{product.cost}}
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>