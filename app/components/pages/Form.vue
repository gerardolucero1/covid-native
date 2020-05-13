<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="*, *">
                <StackLayout col="0" paddingBottom="10" paddingTop="10" paddingLeft="10" @tap="$refs.drawer.nativeView.showDrawer()">
                    <Label text="" class="font-awesome" fontSize="20" />
                </StackLayout>
                <!-- <Label text="" class="font-awesome" fontSize="20" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/> -->
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <Sidedrawer />

            <GridLayout ~mainContent columns="*" rows="*" backgroundColor="#F3F3F3">
                <StackLayout col="0" row="0">
                    <GridLayout rows="50, *" columns="*">
                        <FlexboxLayout row="0" col="0" justifyContent="space-between" alignItems="center">
                            <Label marginLeft="30" text="" class="font-awesome" textWrap="true" @tap="control--" />
                            <Label marginRight="30" text="" class="font-awesome" textWrap="true" @tap="goToIndex()" />
                        </FlexboxLayout>

                        <StackLayout row="1" col="0" backgroundColor="white">
                            
                            <!-- inicio -->
                            <StackLayout v-if="control == 1" width="100%" height="100%" backgroundColor="#2F4095" borderRadius="20 20 0 0" padding="20 30"> 
                                <GridLayout rows="*, *, 50" columns="*">
                                    <StackLayout row="0" col="0">
                                        <Image src="~/assets/images/info-3.png" stretch="aspectFit" />
                                    </StackLayout>
                                    <FlexboxLayout row="1" col="0" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Label color="white" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed a illo, pariatur cum beatae expedita rem aliquid architecto repellendus, officiis libero illum suscipit voluptates atque. Mollitia veniam aliquid voluptate aspernatur?" textWrap="true" />
                                        <Label color="white" marginTop="10" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed a illo, pariatur cum beatae expedita rem aliquid architecto repellendus, officiis libero illum suscipit voluptates atque. Mollitia veniam aliquid voluptate aspernatur?" textWrap="true" />
                                    </FlexboxLayout>
                                    <FlexboxLayout row="2" col="0" justifyContent="center" alignItems="center" borderRadius="10">
                                        <Button text="INICIAR CUESTIONARIO" backgroundColor="white" color="black" width="100%" @tap="control++" />
                                        
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
                            
                            <!-- form 1 -->
                            <StackLayout v-if="control == 2" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <GridLayout rows="*, *, *, 50" columns="*">
                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Image src="~/assets/images/info-3.png" stretch="none" width="100" />
                                        <FlexboxLayout justifyContent="center" alignItems="center" flexDirection="column">
                                            <Label fontSize="17" fontWeight="bold" text="¿Es una emergencia?" textWrap="true" />
                                            <Label fontWeight="bold" text="Marca al 911 si estas sintiendo:" textWrap="true" />
                                        </FlexboxLayout>
                                    </FlexboxLayout>
                                    <FlexboxLayout row="1" col="0" justifyContent="space-around" alignItems="flex-start" flexDirection="column">
                                        <FlexboxLayout alignItems="center">
                                            <Label class="font-awesome" fontSize="10" text="" textWrap="true" />
                                            <Label marginLeft="10" text="Presion o dolor constante y severo en el pecho" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center">
                                            <Label class="font-awesome" fontSize="10" text="" textWrap="true" />
                                            <Label marginLeft="10" text="Dificultad extrema para respirar" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center">
                                            <Label class="font-awesome" fontSize="10" text="" textWrap="true" />
                                            <Label marginLeft="10" text="Mareo constante y severo" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center">
                                            <Label class="font-awesome" fontSize="10" text="" textWrap="true" />
                                            <Label marginLeft="10" text="Desorientacion grave" textWrap="true" />
                                        </FlexboxLayout>
                                    </FlexboxLayout>
                                    <FlexboxLayout row="2" col="0" justifyContent="space-around" alignItems="center" flexDirection="column">
                                        <GridLayout @tap="form1 = true" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                            <FlexboxLayout alignItems="center" row="0" col="0">
                                                <Label text="Estoy sintiendo uno o mas de estos sintomas" textWrap="true" />
                                            </FlexboxLayout>
                                            <FlexboxLayout alignItems="center" row="0" col="1">
                                                <Label :class="[form1 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                            </FlexboxLayout>
                                        </GridLayout>
                                        <GridLayout @tap="form1 = false" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                            <FlexboxLayout alignItems="center" row="0" col="0">
                                                <Label text="No estoy sintiendo ninguno de estos sintomas" textWrap="true" />
                                            </FlexboxLayout>
                                            <FlexboxLayout alignItems="center" row="0" col="1">
                                                <Label :class="[!form1 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                            </FlexboxLayout>
                                        </GridLayout>
                                    </FlexboxLayout>
                                    <FlexboxLayout row="3" col="0" justifyContent="center" alignItems="center" borderRadius="10">
                                        <Button text="SIGUIENTE" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <!-- finalizar -->
                            <StackLayout v-if="(control == 3) && (form1)" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <GridLayout rows="*, 2*" columns="*">
                                    <StackLayout row="0" col="0">
                                        <Image src="~/assets/images/info-3.png" stretch="aspectFit" />
                                    </StackLayout>
                                    <FlexboxLayout row="1" col="0" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Label textAlignment="center" fontWeight="bold" fontSize="25" color="black" text="De acuerdo a tus respuestas, necesitas buscar atencion medica inmediatamente" textWrap="true" />
                                        
                                        <Button text="FINALIZAR" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <!-- form 2 -->
                            <StackLayout v-if="(control == 3) && (!form1)" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <FlexboxLayout justifyContent="center" alignItems="center">
                                    <Label fontSize="20" fontWeight="bold" text="¿Cuantos años tienes?" textWrap="true" />
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="space-around" alignItems="center" flexDirection="column">
                                    <GridLayout @tap="form2 = 1" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Menos de 18" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form2 == 1 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form2 = 2" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Entre 18 y 64" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form2 == 2 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form2 = 3" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="65 o mas" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form2 == 3 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Button text="SIGUIENTE" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                </FlexboxLayout>
                            </StackLayout>

                            <!-- form 3 -->
                            <StackLayout v-if="control == 4" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <GridLayout rows="50, *, 70" columns="*">
                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                        <Label fontSize="20" fontWeight="bold" text="¿Has sentido uno de estos sintomas recientemente?" textWrap="true" />
                                    </FlexboxLayout>

                                    <ScrollView row="1" col="0">
                                        <WrapLayout orientation="horizontal">
                                            <FlexboxLayout marginTop="10" justifyContent="space-around" alignItems="center" flexDirection="column">
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Fiebre o escalofrios" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma1" @checkedChange="sintomas.sintoma1 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Dificultad para respirar leve o moderada" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma2" @checkedChange="sintomas.sintoma2 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Tos nueva o que empeora" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma3" @checkedChange="sintomas.sintoma3 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Perdida del sentido de olfato, gusto o apetito" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma4" @checkedChange="sintomas.sintoma4 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Dolor de garganta" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma5" @checkedChange="sintomas.sintoma5 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Vomito o diarrea" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma6" @checkedChange="sintomas.sintoma6 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Dolor muscular en todo el cuerpo" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma7" @checkedChange="sintomas.sintoma7 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Coloracion azul o morada en labio, dedos o uñas" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma8" @checkedChange="sintomas.sintoma8 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Ninguna de las anteriores" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="sintomas.sintoma9" @checkedChange="sintomas.sintoma9 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                            </FlexboxLayout>
                                        </WrapLayout>
                                    </ScrollView>

                                    <FlexboxLayout row="2" col="0" marginTop="10" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Button text="SIGUIENTE" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <!-- form 4 -->
                            <StackLayout v-if="control == 5" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <GridLayout rows="50, *, 70" columns="*">
                                    <FlexboxLayout row="0" col="0" justifyContent="center" alignItems="center">
                                        <Label fontSize="20" fontWeight="bold" text="¿Tienes alguna de las siguientes condiciones?" textWrap="true" />
                                    </FlexboxLayout>

                                    <ScrollView row="1" col="0">
                                        <WrapLayout orientation="horizontal">
                                            <FlexboxLayout marginTop="10" justifyContent="space-around" alignItems="center" flexDirection="column">
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Asma moderada o severa o enfermedad pulmonar cronica" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma1" @checkedChange="condiciones.sintoma1 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Tratamiento contra el cancer o medicamentos que causan inmunosupresion" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma2" @checkedChange="condiciones.sintoma2 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Inmunodeficiencia congenita o VIH" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma3" @checkedChange="condiciones.sintoma3 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Afecciones cardiacas severas como insuficiencia cardiaca o infarto previo" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma4" @checkedChange="condiciones.sintoma4 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Diabetes con complicaciones" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma5" @checkedChange="condiciones.sintoma5 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Insuficiencia renal que requiere dialisis" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma6" @checkedChange="condiciones.sintoma6 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Cirrosis epatica" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma7" @checkedChange="condiciones.sintoma7 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Obesidad extrema" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma8" @checkedChange="condiciones.sintoma8 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Embarazo" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma9" @checkedChange="condiciones.sintoma9 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                                <GridLayout rows="50" columns="*, 30" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                                    <FlexboxLayout alignItems="center" row="0" col="0">
                                                        <Label text="Ninguna de las anteriores" textWrap="true" />
                                                    </FlexboxLayout>
                                                    <FlexboxLayout alignItems="center" row="0" col="1">
                                                        <check-box :checked="condiciones.sintoma10" @checkedChange="condiciones.sintoma10 = $event.value" />
                                                    </FlexboxLayout>
                                                </GridLayout>
                                            </FlexboxLayout>
                                        </WrapLayout>
                                    </ScrollView>

                                    <FlexboxLayout row="2" col="0" marginTop="10" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Button text="SIGUIENTE" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>

                            <!-- form 5 -->
                            <StackLayout v-if="control == 6" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <FlexboxLayout justifyContent="center" alignItems="center" flexDirection="column">
                                    <Label fontSize="20" fontWeight="bold" text="En los ultimos 14 dias" textWrap="true" />
                                    <Label fontSize="20" fontWeight="bold" text="¿Viajaste al extranjero?" textWrap="true" />
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="space-around" alignItems="center" flexDirection="column">
                                    <GridLayout @tap="form5 = true" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Viajé al extranjero" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form5 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form5 = false" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="No viajé al extranjero" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[!form5 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Button text="SIGUIENTE" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                </FlexboxLayout>
                            </StackLayout>

                            <!-- form 6 -->
                            <StackLayout v-if="control == 7" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <FlexboxLayout justifyContent="center" alignItems="center" flexDirection="column">
                                    <Label fontSize="20" fontWeight="bold" text="En los ultimos 14 dias" textWrap="true" />
                                    <Label fontSize="20" textAlignment="center" fontWeight="bold" text="¿Estuviste en un area donde hay propagacion de COVID-19?" textWrap="true" />
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="space-around" alignItems="center" flexDirection="column">
                                    <GridLayout @tap="form6 = 1" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Vivo en un área donde hay propagacion del virus" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form6 == 1 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form6 = 2" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Visité un area donde hay propagacion del virus" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form6 == 2 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form6 = 3" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Ninguna de las opciones anteriores" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form6 == 3 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form6 = 4" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="No sé" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form6 == 4 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Button text="SIGUIENTE" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                </FlexboxLayout>
                            </StackLayout>

                            <!-- form 7 -->
                            <StackLayout v-if="control == 8" width="100%" height="100%" backgroundColor="white" borderRadius="20 20 0 0" padding="20 30"> 
                                <FlexboxLayout justifyContent="center" alignItems="center" flexDirection="column">
                                    <Label fontSize="20" fontWeight="bold" text="¿Trabajas en un centro medico?" textWrap="true" />
                                    
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="space-around" alignItems="center" flexDirection="column">
                                    <GridLayout @tap="form7 = true" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="Sí trabajo en un centro medico" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[form7 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                    <GridLayout @tap="form7 = false" rows="50" columns="*, 20" margin="5" borderRadius="5" androidElevation="5" backgroundColor="white" padding="0 10">
                                        <FlexboxLayout alignItems="center" row="0" col="0">
                                            <Label text="No trabajo en un centro medico" textWrap="true" />
                                        </FlexboxLayout>
                                        <FlexboxLayout alignItems="center" row="0" col="1">
                                            <Label :class="[!form7 ? 'is-active' : '']" class="font-awesome radio" fontSize="15" text="" textWrap="true" />
                                        </FlexboxLayout>
                                    </GridLayout>
                                </FlexboxLayout>

                                <FlexboxLayout marginTop="10" justifyContent="center" alignItems="center" flexDirection="column">
                                    <Button text="SIGUIENTE" marginTop="10" backgroundColor="#2F4095" color="white" width="50%" @tap="control++" />
                                </FlexboxLayout>
                            </StackLayout>

                            <!-- finalizar 2 -->
                            <StackLayout v-if="control == 9" width="100%" height="100%" backgroundColor="#2F4095" borderRadius="20 20 0 0" padding="20 30"> 
                                <GridLayout rows="*, *, 50" columns="*">
                                    <StackLayout row="0" col="0">
                                        <Image src="~/assets/images/info-3.png" stretch="aspectFit" />
                                    </StackLayout>
                                    <FlexboxLayout v-if="flag" row="1" col="0" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Label color="white" text="Es importante que te comuniques con un profesional de la salud proque algunas de tus respuestas nos indican que puedes estar en una situacion de riesgo" textWrap="true" />
                                        <Label color="white" marginTop="10" text="Comunicate al 200-48-10 para darle seguimiento a tus sintomas" textWrap="true" />
                                    </FlexboxLayout>

                                    <FlexboxLayout v-else row="1" col="0" justifyContent="center" alignItems="center" flexDirection="column">
                                        <Label color="white" text="De acuerdo a tus respuestas, en esta fase de contagio no tienes riesgo de estar enfermod e COVID-19. Por el momento no tienes que tomar ninguna accion mas que mantener la cuarentena. Si tus sintomas llegan a cambiar, realiza el test nuevamente." textWrap="true" />
                                    
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
                        </StackLayout>
                    </GridLayout>
                </StackLayout>
            </GridLayout>
        </RadSideDrawer>

        
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Axios
import axios from 'axios'

//HTTP
const httpModule = require("tns-core-modules/http");

//Moment
let moment = require('moment')

//Pages
import Index from '../pages/Index'

export default {
    name: 'Form',

    data(){
        return{
            control: 1
            ,
            // Form
            form1: false,
            form2: 1,
            sintomas: {
                sintoma1: false,
                sintoma2: false,
                sintoma3: false,
                sintoma4: false,
                sintoma5: false,
                sintoma6: false,
                sintoma7: false,
                sintoma8: false,
                sintoma9: false,
            },

            condiciones: {
                sintoma1: false,
                sintoma2: false,
                sintoma3: false,
                sintoma4: false,
                sintoma5: false,
                sintoma6: false,
                sintoma7: false,
                sintoma8: false,
                sintoma9: false,
            },
            form5: false,
            form6: 1,
            form7: false,

            contador: 0,
            flag: true,
        }
    },

    computed: {
        ...mapState([
                'user'
            ]),
    },

    watch: {
        control(){
            if(this.control == 0){
                this.control = 1
            }

            if(this.control == 9){
                this.acceptCuestionario()
            }

            return
                let valor = 0
                switch (this.form2) {
                    case 1:
                        valor = 0
                        this.contador = this.contador + valor
                        break;
                    case 2:
                        valor = 1
                        this.contador = this.contador + valor
                        break;
                    case 3:
                        valor = 2
                        this.contador = this.contador + valor
                        break;
                
                    default:
                        this.contador = this.contador
                        break;
                }

                valor = 0
                for (const prop in this.sintomas) {
                    if(this.sintomas[prop] == true){
                        valor++
                    }

                    if(prop == 'sintoma9' && this.sintomas[prop] == false) valor = 0
                }

                this.contador = this.contador + valor

                valor = 0
                for (const prop in this.condiciones) {
                    if(this.sintomas[prop] == true){
                        valor++
                    }

                    if(prop == 'sintoma10' && this.condiciones[prop] == false) valor = 0
                }
                contador = contador + valor

                valor = 0
                if(this.form5) valor++
                contador = contador + valor

                valor = 0
                switch (this.form6) {
                    case 1:
                        valor = 3
                        contador = contador + valor
                        break;
                    case 2:
                        valor = 2
                        contador = contador + valor
                        break;
                    case 3:
                        valor = 0
                        contador = contador + valor
                        break;
                    case 4:
                        valor = 1
                        contador = contador + valor
                        break;
                
                    default:
                        contador = contador
                        break;
                }

                valor = 0
                if(this.form7) valor++
                contador = contador + valor

                console.log(this.contador)
        }
    },

    methods: {
        navigate(){
            this.$navigateTo(Index, {
                    animated: true,
                    transition: {
                        name: 'fade',
                    },
                })
        },

        goToIndex(){
            confirm({
                title: "Omitir cuestionario",
                message: "¿Seguro que quieres omitir el cuestionario?",
                okButtonText: "Omitir",
                cancelButtonText: "Continuar"
            }).then(result => {
                if(result){
                    this.acceptCuestionario()
                }
            });
            
        },

        async acceptCuestionario(){
            try {
                let response = await firebase.firestore.collection('users')
                                                        .doc(this.user.uid)
                                                        .update({ cuestionario: true })

                this.goToHome()
            } catch (error) {
                console.lgo(error)
            }
        },

        goToHome(){
            this.$navigateTo(Index)
        },
    }
}
</script>

<style>
    Label{
        color: black;
    }

    .radio{
        color: gray;
    }

    .is-active{
        color: black;
    }
</style>