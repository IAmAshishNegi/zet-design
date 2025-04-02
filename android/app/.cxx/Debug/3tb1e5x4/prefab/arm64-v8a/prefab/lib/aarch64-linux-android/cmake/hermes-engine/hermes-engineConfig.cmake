if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/ashish/.gradle/caches/8.10.2/transforms/580ea94b132323b5522d1ed7437cf458/transformed/hermes-android-0.76.8-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/ashish/.gradle/caches/8.10.2/transforms/580ea94b132323b5522d1ed7437cf458/transformed/hermes-android-0.76.8-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

